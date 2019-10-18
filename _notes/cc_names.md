---
about: Clean Code
---
## Clean Code: Names

This chapter was all about naming things. It is argued that naming things is important because we name basically every piece of... physical thing we produce as programmers: variables with names inside functions with names inside classes with names inside files with names inside folders/modules with names. Once you realize that then it gets harder to argue against the importance of names. These were my notes:

### Good (variable) names:
* Are **intention revealing** (answer questions)
	* why it exists
	* what it does
	* how it is used

* Avoid disinformation
	* similar things *look* smilar (and different things don't)
	* **only one word is used per concept** (single concept does not have different names in different places)
* Make meaninguful distinctions
	* and insert no 'noise' (prefixes/suffixes such as info, object, data)
* Are pronouncable
* Are searchable
* Don't need *encodings* (such as `whatwasagoodname_str` or such as `whatwasagoodname_float`)
* Don't need *mental mapping*

### Naming things
* **Class** names should be **nouns** or noun-phrases
* **Mehtod** names should be **verbs** or verb-phrases

### Naming in general
* Don't be cute *say what you mean, mean what you say*
* Don't pun (have one word mean more than one thing)
* When naming, `if` name exists in solution domain `then` use that name `else` it is ok to use name from problem domain

* Context is helpful for naming
	* Context can be created using data structures such as classes.
