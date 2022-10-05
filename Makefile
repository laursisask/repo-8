-include pritunl.mk

default: build
#default: testacc

# Run acceptance tests
.PHONY: testacc
testacc:
	TF_ACC=1 $(GO) test ./... -v $(TESTARGS) -timeout 120m

# Generate provider documentation
.PHONY: doc
doc:
	$(GO) generate

# Go formatting
.PHONY: fmt
fmt:
	$(GOFMT) -d -e -s $(GO_FILES)

# Go tidy
.PHONY: tidy
tidy:
	$(GO) mod tidy

# Go build
.PHONY: build
build:
	$(GO) build
