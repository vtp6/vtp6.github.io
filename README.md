# [VTP6]

![Deploy status](https://github.com/vtp6/vtp6.github.io/actions/workflows/jekyll-gh-pages.yml/badge.svg)

An minimalistic online successor to the app-based
[VTP5](https://github.com/vtp5/vtp5) vocab-testing program.

Just head over to **[vtp6.github.io][VTP6]** and select your study set.
Then, select the number of words you want to revise using
the slider and press start.

Email any feedback or suggestions to
**vtp6_feedback@outlook.com**.

***

## Import your own set

In case you want to study something other than the
pre-loaded sets on VTP6, you can study your own custom set.
Click "Import custom set" on the homepage to load in your
own set. Then, choose your file and format and click
"Upload".

### VTP5 format

VTP6 is backwards-compatible with VTP5 TXT files, which
are in the following format:

```c
Term
Definition
Term
Definition
```

### VTP6 format

VTP6 also has its own format, with terms and definitions
separated on the same line by a tab character:

```c
Term	Definition
Term	Definition
```

### CSV format

Comma-separated value (CSV) files are also supported. You do
not have to select anything: it will automatically recognise
a CSV file and change its behaviour appropriately. The
format of a CSV file is as follows:

```c
Term,Definition
Term,Definition
```

If the term or definition contains a comma, put quotes around
it.

***

## Modes

### Classic Mode

Classic mode is the basic VTP6 option. You can choose the
number of words you want to revise using the slider and then
press start. Then, answer the questions using the input box.
Classic mode is _**case-insensitive**_ and _**ignores
punctuation**_.

<!-- ![Classic Mode Screenshot](https://github.com/vtp6/vtp6.github.io/assets/55329600/e71eba22-715f-4f48-82a8-5d8395537275) -->

![Classic Mode Recording](https://github.com/vtp6/vtp6.github.io/assets/55329600/ba21fc88-af3e-45b0-a12a-9b77893b2833)


### Match Mode

When you press start, twelve boxes will appear on your
screen. The six on the left are terms; the six on the right
are definitions. You need to match the terms and
definitions by clicking on them. There's a timer at the top
to tell you how long it took.

<!-- ![Match Mode Screenshot](https://github.com/vtp6/vtp6.github.io/assets/55329600/9a9745e8-4890-4343-9ef7-d71637750df8) -->

![Match Mode Recording](https://github.com/vtp6/vtp6.github.io/assets/55329600/a01e0522-9f7e-4731-8755-2d820302e1d6)


### Hangman Mode

Just like the Hangman game, each time you get something
wrong, the hangman picture progresses to the next stage.
Choose the number of words you want to revise and
complete them before the hangman is fully formed.

![Hangman Mode Recording](https://github.com/vtp6/vtp6.github.io/assets/55329600/13f5949c-8c41-44f8-b2a1-f5ad72c3b359)

***

![Logo](https://github.com/vtp6/vtp6.github.io/assets/55329600/d7b16a93-0efc-4ecb-9990-2fdf45c52b37)

<sub>© Rujul Nayak 2023</sub>

[VTP6]: https://vtp6.github.io/
