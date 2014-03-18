test:
	mocha --ui bdd -R spec

install:
	npm install

.PHONY: test