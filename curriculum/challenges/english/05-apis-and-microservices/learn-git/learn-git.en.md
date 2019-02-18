---
id: 5c5f18d686d54b762c17894e
title: Commits
challengeType: 10
---

## Description
<section id='description'>
A commit in a git repository records a snapshot of all the files in your directory. It's like a giant copy and paste, but even better!

Git wants to keep commits as lightweight as possible though, so it doesn't just blindly copy the entire directory every time you commit. It can (when possible) compress a commit as a set of changes, or a "delta", from one version of the repository to the next.

Git also maintains a history of which commits were made when. That's why most commits have ancestor commits above them -- we designate this with arrows in our visualization. Maintaining history is great for everyone working on the project!

It's a lot to take in, but for now you can think of commits as snapshots of the project. Commits are very lightweight and switching between them is wicked fast!
</section>

## Instructions
<section id='instructions'>
Let's start by making two commits. Type "git commit" twice to complete this lesson.
</section>

## Tests
<section id='tests'>

```yml
tests:
  - text: Your <code>img</code> tag should have an <code>alt</code> attribute, and it should not be empty.
    testString: assert($('img').attr('alt'), 'Your <code>img</code> tag should have an <code>alt</code> attribute, and it should not be empty.');

```

</section>

## Challenge Seed
<section id='challengeSeed'>

<div id='html-seed'>

```html

```

</div>



</section>

## Solution
<section id='solution'>

```js
// solution required
```
</section>
