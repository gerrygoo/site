---
about: cpp
---
## C++: Intro
### Super basics
* C++ is a compiled language
	* Source text is processed by compiler
	* Object files are produced
	* Linker combines object files
	* Executable program is produced for that system)  

* ISO C++ defines two kinds of *entities*
	* Core *language features* (what lisp people call keywords)
	* STL *components*  

* Statically typed: The type of every entity must be *known to the compiler* at its point of use.The type of an object determines the set of operations applicable to it.
* There is a  `main` function in every program that should call everything else 
* `{ }`  express grouping

### Types, variables
* *Declaration*: a statement that introduces a name into the program, it specifies a type for the named entity
	* *Type*: defines a set of possible values and operations for an object
	* *Object*: some memory that holds a value of some type
	* *Value*: a set of bits interpreted according to a type
	* *Variable*: a named object  

* *Initialization*
	* `=`
	* `{ }`, which is aware of truncating conversions
		* Optionally `= { }`
	* `const` can't be left uninitialized.
	* variables should not be left uninitialized. names should be introduced when needed.
	* 'user-defined' (non built-in) types can be set up to be implicitly initialized.  

	* Explicit type statement in variable definition is not required when it can be deduced from the initializer using `auto`.  


* Constants
	* `const`: I promise not to change this (compiler enforced). Used to specify interfaces.
	* `constexpr`: To be evaluated at compile time. Used to specify constants, read only memory (whatever that means) and **performance**  

* Branching, sequencing, looping
	* `if`, `switch`
	* In *declarations*, there are *declaration operators*
		* `[]` means 'array of'
		* `*` means 'pointer to'
		* `&` means 'reference to'
			* references can't be made to refer to something different after initialization
			* `*` value of does not need to be used
		* `T f(A)` 
	* In *expressions*
		* `*` means 'value of'
		* `&` means 'address of'
	* `for( initialization ; check ; 'increment' )`
	* or the ***ranged*** form `for (auto : sequence)`  

### User defined types
* `struct` organizes the elements of a type into a data structure. *a* `struct`
	* `.` accesses `struct` elements through a *name* or a *reference*
	* `->` acceses `struct` elements through a pointer
	* *members*
		* data
		* function
		* type

* `class` 
	* distinction between interface and implementation (`public:` and `private:` members) 
* `enum class` - simple form of user defined type

### Modularity
* *declarations* specify interfaces
* *definitions* specify implementation
* Separate compilation
	* *header* `.h` files with definitions
	* *cpp* `.cpp` files with declarations
* `namespace` groups names together to be accessed like `namespace::name`
* error handling: employ *exceptions* to inform users that an error ocurred
	* users can *handle* exceptions in `try { } catch (exception) { }` handlers
* Statements that are assumed to be true for a class are *invariants* and should be established in class constructors
* `static_assert(constant_expr, message)` will print `message` at compilation if `constant_expr` is not true**
