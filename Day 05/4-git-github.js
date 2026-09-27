// ============================================================
// 1. THE THREE PLACES YOUR CODE LIVES
// ============================================================
//
// 1. Working Tree
//    The files you are currently editing.
//
// 2. Staging Area
//    The changes selected for the next commit.
//
// 3. Git History
//    Saved commits/snapshots.
//
// Typical movement:
//
// Working Tree -> git add -> Staging Area -> git commit -> History

// ============================================================
// 2. CHECK REPOSITORY STATUS
// ============================================================
//
// git status
//
// Compact version:
//
// git status --short
//
// Common status symbols:
//
// ?? file.js  -> untracked
// A  file.js  -> new file staged
//  M file.js  -> modified but not staged
// M  file.js  -> modified and staged
// UU file.js  -> merge conflict

// ============================================================
// 3. VIEW CHANGES
// ============================================================
//
// Unstaged changes:
//
// git diff
//
// Staged changes:
//
// git diff --staged

// ============================================================
// 4. STAGE CHANGES
// ============================================================
//
// Stage one file:
//
// git add app.js
//
// Stage several files:
//
// git add app.js utils.js
//
// Stage everything in the current folder:
//
// git add .
//
// Good habit:
//
// git status
// git add .
// git status
//
// Always inspect what you are about to commit.

// ============================================================
// 5. CREATE A COMMIT
// ============================================================
//
// git commit -m "Add Promise examples"
//
// Better commit messages describe the change clearly.
//
// Bad:
// git commit -m "update"
//
// Better:
// git commit -m "Add Promise.all student loading example"
//
// Prefer imperative wording:
// Add...
// Fix...
// Refactor...
// Remove...
// Update...

// ============================================================
// 6. VIEW COMMIT HISTORY
// ============================================================
//
// git log
//
// Compact:
//
// git log --oneline
//
// Useful branch graph:
//
// git log --oneline --graph
//
// Include all branches:
//
// git log --oneline --graph --all

// ============================================================
// 7. .gitignore
// ============================================================
//
// Typical .gitignore:
//
// node_modules/
// .env
// .DS_Store
// Thumbs.db
// .vscode/
//
// node_modules can be recreated using npm install.
// .env commonly contains secrets and should not be committed.

// ============================================================
// 8. CREATE AND SWITCH TO A BRANCH
// ============================================================
//
// Modern command:
//
// git switch -c feature/day-05
//
// Older equivalent:
//
// git checkout -b feature/day-05
//
// List branches:
//
// git branch
//
// Switch back:
//
// git switch main

// ============================================================
// 9. WHY BRANCHES?
// ============================================================
//
// A branch lets you work on a feature without directly changing
// main.
//
// Example workflow:
//
// git switch main
// git pull
// git switch -c feature/promises
//
// ...edit files...
//
// git add .
// git commit -m "Add Promise examples"

// ============================================================
// 10. MERGING A BRANCH
// ============================================================
//
// First switch to the branch that should RECEIVE the changes:
//
// git switch main
//
// Then merge:
//
// git merge feature/promises
//
// Delete the local feature branch after a successful merge:
//
// git branch -d feature/promises

// ============================================================
// 11. FAST-FORWARD MERGE
// ============================================================
//
// If main did not receive new commits after the feature branch
// was created, Git may simply move main forward.
//
// Example output:
//
// Updating abc123..def456
// Fast-forward
// app.js | 20 ++++++++++++++++++++
//
// No extra merge commit is necessary.

// ============================================================
// 12. MERGE COMMIT
// ============================================================
//
// If both branches have new commits, Git may create a merge
// commit that joins both histories.
//
// View it:
//
// git log --oneline --graph --all

// ============================================================
// 13. MERGE CONFLICTS
// ============================================================
//
// A conflict can happen when two branches change the same lines.
//
// Git may place markers like:
//
// <<<<<<< HEAD
// const PASS_MARK = 50;
// =======
// const PASS_MARK = 70;
// >>>>>>> experiment/pass-mark
//
// HEAD = current branch
// Bottom section = branch being merged
//
// To resolve:
// 1. Edit the file into the correct final version.
// 2. Delete ALL conflict marker lines.
// 3. Save the file.
// 4. Stage it.
// 5. Commit the merge.
//
// Commands:
//
// git add path/to/file.js
// git commit

// ============================================================
// 14. ABORT A MERGE
// ============================================================
//
// If you want to cancel an unfinished merge:
//
// git merge --abort

// ============================================================
// 15. REMOTES
// ============================================================
//
// Git works locally.
// GitHub can host a remote copy.
//
// Add a remote:
//
// git remote add origin https://github.com/USERNAME/REPOSITORY.git
//
// View remotes:
//
// git remote -v

// ============================================================
// 16. PUSH MAIN FOR THE FIRST TIME
// ============================================================
//
// git push -u origin main
//
// -u sets the upstream relationship.
//
// Later:
//
// git push

// ============================================================
// 17. PUSH A FEATURE BRANCH
// ============================================================
//
// git switch -c feature/esm-modules
//
// ...edit...
//
// git add .
// git commit -m "Add ES module examples"
//
// git push -u origin feature/esm-modules
//
// Later pushes from the same branch:
//
// git push

// ============================================================
// 18. PULL REMOTE CHANGES
// ============================================================
//
// git pull
//
// A useful habit before starting:
//
// git switch main
// git pull
//
// Then create your feature branch.

// ============================================================
// 19. CLONE A REPOSITORY
// ============================================================
//
// git clone https://github.com/USERNAME/REPOSITORY.git
//
// Then:
//
// cd REPOSITORY

// ============================================================
// 20. PULL REQUEST WORKFLOW
// ============================================================
//
// Typical team workflow:
//
// 1.
// git switch main
//
// 2.
// git pull
//
// 3.
// git switch -c feature/day-05
//
// 4.
// Edit files.
//
// 5.
// git status
//
// 6.
// git add .
//
// 7.
// git commit -m "Add Day 05 examples"
//
// 8.
// git push -u origin feature/day-05
//
// 9.
// Open GitHub and create a Pull Request.
//
// 10.
// Review changes.
//
// 11.
// Merge the Pull Request.
//
// 12.
// Back locally:
//
// git switch main
// git pull
//
// 13.
// Delete the old local branch:
//
// git branch -d feature/day-05

// ============================================================
// 21. GOOD PULL REQUEST DESCRIPTION
// ============================================================
//
// WHAT
// Explain what changed.
//
// WHY
// Explain why the change was needed.
//
// HOW TO TEST
// Explain how another developer can verify it.
//
// Example:
//
// What:
// Split grading logic into reusable ES modules.
//
// Why:
// The same functions were duplicated in several files.
//
// How to test:
// Run node report.js and verify the generated report.

// ============================================================
// 22. DISCARD UNSTAGED EDITS
// ============================================================
//
// WARNING: This removes local edits from the file.
//
// git restore report.js

// ============================================================
// 23. UNSTAGE A FILE BUT KEEP THE EDITS
// ============================================================
//
// git restore --staged report.js
//
// The file remains modified in your working tree.

// ============================================================
// 24. AMEND THE LAST COMMIT
// ============================================================
//
// Useful before pushing when you forgot a file or want to change
// the last commit message.
//
// git commit --amend
//
// Or:
//
// git commit --amend -m "Better commit message"
//
// Avoid rewriting commits other developers already pulled.

// ============================================================
// 25. REVERT A PUSHED COMMIT
// ============================================================
//
// Safe way to undo a commit already shared:
//
// git revert <commit-hash>
//
// Example:
//
// git revert a1b2c3d
//
// Git creates a NEW commit that reverses the old one.

// ============================================================
// 26. INSPECT ONE COMMIT
// ============================================================
//
// git show <commit-hash>
//
// Example:
//
// git show a1b2c3d

// ============================================================
// 27. "FETCH FIRST" PUSH ERROR
// ============================================================
//
// Example error:
//
// ! [rejected] main -> main (fetch first)
//
// Usually means the remote has commits you do not have.
//
// Typical flow:
//
// git pull
//
// Resolve conflicts if necessary.
//
// git push

// ============================================================
// 28. NO UPSTREAM BRANCH ERROR
// ============================================================
//
// Example:
//
// fatal: The current branch feature/x has no upstream branch
//
// Fix:
//
// git push -u origin feature/x

// ============================================================
// 29. AUTHOR IDENTITY UNKNOWN
// ============================================================
//
// Configure your identity:
//
// git config --global user.name "Your Name"
//
// git config --global user.email "you@example.com"

// ============================================================
// 30. ACCIDENTALLY TRACKED node_modules
// ============================================================
//
// First add:
//
// node_modules/
//
// to .gitignore.
//
// Then stop tracking the existing copy:
//
// git rm -r --cached node_modules
//
// Commit:
//
// git add .gitignore
// git commit -m "Stop tracking node_modules"

// ============================================================
// 31. IF A SECRET WAS PUSHED
// ============================================================
//
// Important:
// Removing a secret from the latest file is not enough because
// it may still exist in Git history.
//
// First action:
// Rotate/change the exposed password, token, or API key.
//
// Then clean the repository/history as needed.

// ============================================================
// 32. PRACTICE: CREATE A FEATURE BRANCH
// ============================================================
//
// git switch main
// git pull
// git status
// git switch -c feature/day-05
//
// Make changes.
//
// git add part-1-promises.js
// git commit -m "Add Promise teaching examples"
//
// git add part-2-async-await.js
// git commit -m "Add async await teaching examples"
//
// git log --oneline --graph

// ============================================================
// 33. PRACTICE: CREATE A CONFLICT ON PURPOSE
// ============================================================
//
// Start from main:
//
// git switch main
//
// Create experiment branch:
//
// git switch -c experiment/pass-mark
//
// Change:
//
// const PASS_MARK = 70;
//
// Commit:
//
// git add .
// git commit -m "Raise pass mark to 70"
//
// Back to main:
//
// git switch main
//
// Change the SAME line:
//
// const PASS_MARK = 50;
//
// Commit:
//
// git add .
// git commit -m "Lower pass mark to 50"
//
// Merge:
//
// git merge experiment/pass-mark
//
// Git should report a conflict.
//
// Resolve the file manually, then:
//
// git add path/to/grade-lib.js
// git commit
//
// Delete experiment branch:
//
// git branch -d experiment/pass-mark

// ============================================================
// 34. PRACTICE: PUSH AND OPEN A PR
// ============================================================
//
// git switch main
// git pull
// git switch -c feature/day-05-notes
//
// Make changes.
//
// git add .
// git commit -m "Add Day 05 notes"
//
// git push -u origin feature/day-05-notes
//
// Open GitHub:
// - Create Pull Request
// - Review Files changed
// - Merge Pull Request
// - Delete remote branch
//
// Then locally:
//
// git switch main
// git pull
// git branch -d feature/day-05-notes

// ============================================================
// 35. DAILY GIT ROUTINE
// ============================================================
//
// START:
//
// git switch main
// git pull
// git switch -c feature/my-feature
//
// WORK:
//
// git status
// git diff
// git add .
// git diff --staged
// git commit -m "Clear commit message"
//
// SHARE:
//
// git push -u origin feature/my-feature
//
// PR:
// Create -> Review -> Merge
//
// CLEAN UP:
//
// git switch main
// git pull
// git branch -d feature/my-feature

// ============================================================
// 36. SMALL JAVASCRIPT DEMO FOR THIS FILE
// ============================================================
// This is only here so the .js file itself remains a valid
// runnable JavaScript teaching file.

const gitConcepts = [
  "Working Tree",
  "Staging Area",
  "Commit History",
  "Branches",
  "Merge Conflicts",
  "Remote",
  "Push and Pull",
  "Pull Requests",
];

// Uncomment during the introduction:
// console.log("Git concepts for today:");
// console.log(gitConcepts);

// ============================================================
// END OF PART 4
// ============================================================
// Main ideas:
// - working tree, staging area, history
// - status, diff, add, commit, log
// - .gitignore
// - branches and merges
// - conflicts
// - GitHub remotes
// - push, pull, clone
// - Pull Request workflow
// - safe undo commands
