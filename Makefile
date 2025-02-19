# Run storybook development server
dev:
	@echo "Starting frontend development server..."
	@cd packages/react-forms-dev && yarn storybook

# Generate documentation
generate-docs:
	@yarn workspace react-forms-store run docs
	@yarn workspace react-forms-store-ux run docs

# Serve documentation for react-forms-store
serve-docs-react-forms-store:
	@echo "Serving documentation for react-forms-store..."
	@cd packages/react-forms-store/docs && npx live-server --port=8080 --open=README.md

# Serve documentation for react-forms-store-ux
serve-docs-react-forms-store-ux:
	@echo "Serving documentation for react-forms-store-ux..."
	@cd packages/react-forms-store-ux/docs && npx live-server --port=8081 --open=README.md
