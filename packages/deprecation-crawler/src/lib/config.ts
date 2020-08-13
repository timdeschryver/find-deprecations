import { prompt } from 'enquirer';
import { CrawlConfig } from './models';
import {
  CRAWLER_CONFIG_PATH,
  DEPRECATIONS_OUTPUT_DIRECTORY,
} from './constants';
import { readFile, updateRepoConfig, git } from './utils';
import { ensureTsConfigPath } from './tasks/ensure-crawler-tsconfig';
import * as yargs from 'yargs';

export async function getConfig(): Promise<CrawlConfig> {
  // Check for path params from cli command
  const argPath = (yargs.argv.path
    ? yargs.argv.path
    : yargs.argv.p
    ? yargs.argv.p
    : ''
  )
    .toString()
    .trim();
  // if no param is given it is '' if param with no value is given it is true
  const argPathGiven = argPath !== 'true' && argPath !== '';
  const crawlerConfigPath = argPathGiven ? argPath : CRAWLER_CONFIG_PATH;

  const repoConfigFile = readFile(crawlerConfigPath) || '{}';
  let repoConfig = JSON.parse(repoConfigFile);
  repoConfig = await ensureTsConfigPath(repoConfig);

  // Check for tag params from cli command
  const argTag = (yargs.argv.tag
    ? yargs.argv.tag
    : yargs.argv.t
    ? yargs.argv.t
    : ''
  )
    .toString()
    .trim();

  // if no param is given it is '' if param with no value is given it is true
  const argTagGiven = argTag !== 'true' && argTag !== '';
  const tagChoices = argTagGiven
    ? [argTag]
    : await sortTags(await getGitHubBranches(), await getGitHubTags());
  // select the string value if passed, otherwise select the first item in the list
  const intialTag = argTagGiven ? argTag : 0;

  const userConfig: CrawlConfig = await prompt([
    {
      type: 'select',
      name: 'gitTag',
      message: `What git tag do you want to crawl?`,
      skip: argTagGiven,
      // @NOTICE: by using choices here the initial value has to be typed as number.
      // However, passing a string works :)
      initial: (intialTag as unknown) as number,
      choices: tagChoices,
    },
    {
      type: 'input',
      name: 'outputDirectory',
      message: "What's the output directory?",
      initial: repoConfig.outputDirectory || DEPRECATIONS_OUTPUT_DIRECTORY,
      skip: !!repoConfig.outputDirectory,
    },
    {
      type: 'input',
      name: 'deprecationComment',
      message: "What's the deprecation keyword to look for?",
      initial: repoConfig.deprecationComment || '@deprecated',
      skip: !!repoConfig.deprecationComment,
    },
    {
      type: 'input',
      name: 'deprecationLink',
      message:
        "What's the deprecation link to the docs (the deprecation ruid will be appended to this)?",
      initial: repoConfig.deprecationLink || 'https://rxjs.dev/deprecations',
      skip: !!repoConfig.deprecationLink,
    },
  ]);

  const config = {
    outputFormatters: ['tagBasedMarkdown', 'groupBasedMarkdown'],
    groups: [],
    configPath: crawlerConfigPath,
    ...repoConfig,
    ...userConfig,
  };

  updateRepoConfig(config);
  return config;
}

async function sortTags(tags: string[], branches: string[]): Promise<string[]> {
  const currentBranchOrTag = (
    (await git(['branch', '--show-current'])) ||
    (await git(['describe', ' --tags --exact-match']))
  ).trim();

  // remove any duplicates
  const sorted = [...branches, ...tags].sort(innerSort);
  return [...new Set([currentBranchOrTag, ...sorted])];

  function innerSort(a: string, b: string): number {
    const normalizedA = normalizeSemverIfPresent(a);
    const normalizedB = normalizeSemverIfPresent(b);

    return (
      ((/[A-Za-z]/.test(normalizedA) as unknown) as number) -
        ((/[A-Za-z]/.test(normalizedB) as unknown) as number) ||
      (normalizedA.toUpperCase() < normalizedB.toUpperCase()
        ? 1
        : normalizedA.toUpperCase() > normalizedB.toUpperCase()
        ? -1
        : 0)
    );
  }

  function normalizeSemverIfPresent(str: string): string {
    const regex = /^([0-9]+)\.([0-9]+)\.([0-9]+)(?:-([0-9A-Za-z-]+(?:\.[0-9A-Za-z-]+)*))?(?:\+[0-9A-Za-z-]+)?$/;
    const potentialVersionNumber =
      str[0].toLowerCase() === 'v' ? str.slice(1) : str;
    return regex.test(potentialVersionNumber) ? potentialVersionNumber : str;
  }
}

export async function getGitHubTags(): Promise<string[]> {
  const branches = await git(['tag']);
  return (
    branches
      .trim()
      .split('\n')
      // @TODO remove ugly hack for the `*` char of the current branch
      .map((i) => i.split('* ').join(''))
      .sort()
  );
}

export async function getGitHubBranches(): Promise<string[]> {
  const branches = await git(['branch']);
  return (
    branches
      .trim()
      .split('\n')
      // @TODO remove ugly hack for the `*` char of the current branch
      .map((i) => i.split('* ').join(''))
      .sort()
  );
}
