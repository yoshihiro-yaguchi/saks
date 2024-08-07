pint: ## コードフォーマットチェック
	./vendor/bin/pint -v --test
pint-fix: ## コード整形
	./vendor/bin/pint -v
analyse: ## コード解析
	./vendor/bin/phpstan analyse --memory-limit=2G
analyse-generate-baseline: ## 解析ベースライン作成
	./vendor/bin/phpstan analyse --memory-limit=2G --generate-baseline
fix-and-analyse: ## コード整形と解析
	./vendor/bin/pint -v; ./vendor/bin/phpstan analyse --memory-limit=2G;
