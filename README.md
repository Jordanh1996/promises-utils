# @promise #

This repo uses:

* [lerna](https://github.com/lerna/lerna) - for running scripts in our packages (version, publish, test, etc...)

### Development ###

first, make sure this repo is in the same directory as lusha-backoffice.
i.e:
```
dev/
   │
   └───lusha-backoffice
   │   
   └───lusha-ui-containers
```
then:
* run ```yarn```
* run ```npm run init```

what it will do?

* run ```lerna bootstrap``` which will install all external dependencies of each package
run ```lerna run build``` which will create the "lib" folder for each package.

If you develop inside this repo - run the command ```npm run watch```
(it will watch all files in the "packages" folder,and run the "build" script automatically)

### Deployment ###

After you finish your development:

* push your changes (it will run linter and tests on packages that have been changed - see husky scripts in package.json)
* run ```npm run version``` (otherwise, your changes won't be published to nexus)

### Tests ###
If you want to add tests to your package then: 

* add the file `jest.config.js`:
(This way, it will take all configuration from the jest config file from the root)

```js
module.exports = {
  transform: {
    '^.+\\.jsx?$': ['babel-jest', { rootMode: 'upward' }],
  },
};
```

* Add the script ``` { "test": "jest" } ```
