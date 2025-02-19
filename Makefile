# Run storybook development server
dev:
	@echo "Starting frontend development server..."
	@cd packages/react-forms-dev && yarn storybook

# Generate documentation
generate-docs:
	@yarn workspace react-forms-store run docs
	@yarn workspace react-forms-store-ux run docs
