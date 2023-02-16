# solid-fsd-template
Template for solid-js projects with effector and Feature-Sliced Design

# Installation

## Git only
```sh
mkdir [project name]
cd [project name]
git clone https://github.com/strwatcher/solid-fsd-template .
rm -rf .git
git init
pnpm install
```

## Gh cli (need installed gh)

```sh
gh repo create [project-name] --[public/private] --clone --template=strwatcher/solid-fsd-template
cd [project-name]
pnpm install
```

# Usage
### Run
```sh
pnpm dev
```
### Storybook
```sh
pnpm storybook
```
### Lint
```sh
pnpm lint [path]
```
### Format
```sh
pnpm format [path]
```
