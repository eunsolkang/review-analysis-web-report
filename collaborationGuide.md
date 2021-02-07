# Collaboration Guide

## Commit Message Format

```
<emoji> <type>:<subject> (#<number>)
```

### Example
:memo: docs: Add commit message format (#1)

### Message Subject(first line)
- Capitalize the `<subject>`.
- Do not end the first line with a period.
- Total characters of the first line **MUST** be _Less_ than or _Equal_ to **50** characters Long.
- Use the **present tense** ("Add feature" not "Added feature").
- Use the **imperative mood** ("Move cursor to..." not "Moves cursor to...").
- Use `<type>` to identify what type of changes introduced in this commit;
  - feat: Introduce new features(:sparkles: emoji)
  - fix: Fix a bug(:bug: emoji)
  - docs: Add or update documentation(:memo: emoji)
  - style: Improve structure / format of the code(:art: emoji)
  - refactor: Refactor code(:recycle: emoji)
  - test: Add or update tests(:white_check_mark: emoji)
  - chore: Fix typos, update grunt tasks etc(:hammer: emoji)
  - ml: Add or update codes for machine learning(🧠 emoji)
  - data: Add or update data acquisition codes / Add data files(:floppy_disk: emoji)
- If you need more than one keyword or emoji to use, you should probably think twice!. This usally means you need to break this commit into more smaller commits; If thats not the case then separate each emoji with a space.


### Notes
- All **WIP**(Work In Progress) commits **SHOULD** have the :construction: Emoji.
- All **WIP** commits **SHOULD** be avoided!.
- Referencing Issues by using special keywords like `Fixes` or `Resolves` will mark them as closed automatically! For more  information about automatic issue closing using keywords see their documentation(linked above).
- Every emoji text(`:emoji:`) is counted as one character!.
