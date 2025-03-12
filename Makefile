dev:
	@echo "Starting frontend development server..."
	@cd packages/react-forms-dev && yarn storybook

test:
	@echo "Running tests..."
	@yarn workspace react-forms-store run test
