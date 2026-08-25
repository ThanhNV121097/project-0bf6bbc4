package migrations

import "embed"

// Files contains all SQL migrations embedded from this directory.
//go:embed *.sql
var Files embed.FS
