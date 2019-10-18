---
about: Clean Code
---
## Celan Code: Functions

This is the first chapter that did sound a bit out of date to me. Maybe not out of date but more... *clearly strict* in its judgements. As the title suggests it's all about functions (or methods) and how they are a tool to manage abstraction in order to use it almost like a rethorical device to write out what is being done in the code.

### Functions should
* Be really short
	* Like *really* short
	* 1 - 2 indentation levels generally making more function calls (yaay)  

* Do one thing, do it well, do it *only*
	* Refer to LOGO's `TO do_a_thing` syntax for writing functions.  

* Follow 'The Stepdown Rule':  
Methods that call methods that call methods [...] can (and should) be used to 'spell out' how a certain task is performed by stepping down through its abstraction levels.

* Have switch statements buried at the lowest abstraction level. (apparently they tend to spread otherwise)
* Prefer long and descriptive names over short and enigmatic ones.

### Function arguments
* In general, the less arguments the better.  
niladic > monadic > dyadic > triadic...

* Several arguments that actually correspond to the same object don't really make a function n-adic (such as `Point(0,0)`). The same is true for variadics such as `sum(**args)`(actually a monad).

* Prefer wrapping what would be many arguments into objects

* Prefer return value to 'output arguments'

* Avoid 'flag' arguments. They generally correspond to a branch in the code that you can *extractmethod* out.


#### Common monads
* Ask something about argument `is_empty(arg)`
* Transform argument into return value `square(arg)`
* Make an event happen `print(arg)`

#### Dyads and Tryads
* Dyads can generally be transformed into monads by using the context around them.  

* Dyads and tryads can generally make you pause to think *extra* extra.  
(About argument ordering, or about an argument that's going to be the same in all your calls so you start ignoring it and so on)

### Naming
Use good naming to express the intent of the function, the intent of the arguments and their ordering.  

* A way of doing this is using keywords: `assert_equals(expected, actual)` vs `assert_expected_equals_actual(expected, actual)`

### Side effects
Prefer pure functions (no side effects). Side effects are bad because:  

* They are not explicit to a function caller
* Can violate *do one thing*
* They can lead to temporal coupling

### Output arguments
Should be avoided.  
They can be misleading when it's hard for a caller to know if arguments are *real* arguments or output arguments.

### Methods & Command Query Separation
Functions can either **change the state of an object** or **answer a question about an object** but not both.

### Exceptions > Error codes
* Error codes tend to be more work for the caller.
* Error codes are also 'a subtle violation of the command query separation'
* The nicest way to do error codes is to have a data structure such as an *enum* to hold the values, but that represents a *dependency magnet* which is not nice in and of itself.

#### Try-Catch Block Extraction
Error handling is one thing. Functions should do one thing. As such:  

* The bodies of try-catch blocks shoudl be extracted.

