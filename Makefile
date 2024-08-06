pint: ## コードフォーマットチェック
	./vendor/bin/pint -v --test
pint-fix: ## コード整形
	./vendor/bin/pint -v
analyse: ## コード解析
	./vendor/bin/phpstan analyse --memory-limit=2G
fix-and-analyse: ## コード整形と解析
	./vendor/bin/pint -v; ./vendor/bin/phpstan analyse --memory-limit=2G;
