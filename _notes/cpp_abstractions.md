---
about: cpp
---
## C++: Abstraction mechanisms
### Basic classes
* Concrete: 'just like built in types'
	* user would recompile if representation changes in a significant way
	* representation is part of definition
	* efficient
		* place objects in stack (statically allocated memory)
		* refer to objects directly (not just through pointers and references)
		* initialize objects immidiately and completely
		* copy objects
	* destructor `~ClassName()`
	* RAII: acquire resources in constructor and deallocate in destructor

* Abstract: a class with a pure virtual function
	* user does not care at all about representation. representation can change without user recompiling
	* usually used through pointers or references
	* `virtual` keyword means 'may be redfined later in a class derived from this one'
	* `= 0` or *pure virtual* means 'some class derived from this *must* define this function'
	* `:public` means 'derived from'
	* a class that provides an interface to a variety of other classes is called a *polymorphic type*
	* Classes with virtual function have a *virtual function table* or `vtbl`

* Class hierarchy: 'a set of classes ordered in a lattice created by derivation'
* The `vtbl` is used when a user calls functions of an 'abstract' interface to resolve and invoke the correct function from the most derived class.
* Class hierarchies offer
	* Interface inheritance (base class is an interface for derived class)
	* Implementation inheritance (base class provides functions or data to derived class)

* Avoid not `delete`ing objects in the free store: use `unique_ptr`
* Copying and Moving
* when to memeberwise copy
	* concrete type: yeah
	* sophisticated concrete type: no
	* abstract type: almost never
* Copy of an object of a class is defined by:  
(for class `X` argument is `const X&`)
	* copy constructor
	* copy assignment operator  
* for move:  
(for class `X` argument is `X&&`)  
`&&` means *rvalule reference*. i.e. no one can assign to it
	* move constructor
	* move assignment operator  
* `=delete` to suppress operations like copy and move for class hierarchy when object members are unknown given a pointer to a base.  

### Templates
'A class or a function that is parametrized with a set of types or values'. A compile-time mechanism (no runtime overhead).  

* Parametrized types
	* use `template<typemame T>`  
	a mathematical 'for all types T'
	* use `T` for typing  

	* Use parametrized *functors* to *strategy pattern* algorithms.  
	`[ capture_list ]( arguments ){ body }` names from local scope in capture list are 'captured' into the scope of body
		* capture nothing: `[]`
		* capture everything by reference: `[&]`
		* caputre evrything by value: `[=]`
		* capture a name by reference: `[&name]`
* Variadic templates
	* `template<typename... VariadicTypenames>`
	* First argument can be separated like: `template<typename T, typename... VariadicTypenames>`
* Aliases: synonym for a type or template
	* `using` keyword
