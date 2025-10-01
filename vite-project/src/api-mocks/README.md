# Mock Pull Request Data

This folder contains mock PR data used for testing our dashboard ui without hitting the github api.

## Source

The data is simplified and exported from the public repository:
[kunjgit/GameZone](https://github.com/kunjgit/GameZone)

## Endpoint used

```http
GET https://api.github.com/repos/kunjgit/GameZone/pulls?state=all
```

## Github api docs for PRs

https://docs.github.com/en/rest/pulls/pulls?apiVersion=2022-11-28#get-a-pull-request
