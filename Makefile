SRC = $(wildcard lib/*/*.js)
HTML = $(wildcard lib/*/*.html)
TEMPLATES = $(HTML:.html=.js)

build: components $(SRC) $(TEMPLATES)
	@component build -o ./public/js -n meishengo
	@uglifyjs ./public/js/meishengo.js > ./public/js/meishengo.min.js

components: component.json
	@component install

%.js: %.html
	@component convert $<

clean:
	rm -fr build components $(TEMPLATES)

run: build
	@node app.js

.PHONY: clean
