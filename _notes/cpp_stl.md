##C++: Concurrency and Utilities
###Resource management
* Use RAII
* Use 'smart pointers' for objects on the free store  
Smart pointers will automagically destroy the objects they own when they go out of scope.
	* `unique_ptr`also supports move semantics for passing free-store allocated objects around scopes.
	* `shared_ptr` is similar, but copied rather than moved. the resources it owns are destroyed when 
	* these help implement a 'no naked `new`' policy  

	Even though smart pointers do resource management, they provide no **read/write** policy for the resources they hold. Their usage does not help with the *sharing* of resources, as data races and other issues can occur.  
	
	Pointers are used in the following scenarios:  
	
	* Sharing an object (or a polymorphic object) (`shared_ptr`)
	* Referring to a polymorphic object (`unique_ptr`)  

###Concurrency
* *task* = "A computation that can be executed concurrently with other computations"  
* A task is launched by constructing a `std::thread` using a functor
* `thread`s share an address space
	* communicate through shared objects
	* communication controlled by lock mechanisms to prevent data races
* `join` waits for a thread to terminate  

* To pass arguments, a functor that captures the necessary arguments is constructed (either by hand or by using `thread`'s variadic constructor, and `<functional>`'s `ref()` and `cref()` utilities)
* To return results:
	* have task to modify an argument
	* have task return by an explicit output argument (and explicitly make input arguments `const`)  

####Data sharing
* Use `mutex`: "a mutual exclusion object"
	* is acquired by `.lock()`
	* is released by `.unlock()`
	* Can be done automatically using `unique_lock`'s constructor
		* Lock can be defered with `defer_lock` in `unique_lock`'s constructor and then manually using variadic `lock()`
	* `condition_variable` provides utilities for 'events' in which one thread can wait for another thread to end  

####Task communicating
* `future`/`promise`
	* `.get()` a `future` to get the value from it, blocking if wait is necessary
	* `.set_value()` in a promise, it passes the value to the corresponding future that waits for it
* `packaged_task` is used to produce the needed future/promise pairs that a caller would use:  
	* has `.get_future()` to construct futures
	* is a promise functor to construct threads  

	the used threads still have to be joined tho

* `async()` straight up returns a `future` that a caller can `.get()`. No worrying about threads.  

####Misc
* Time utilities can be found in `std::chrono`
* *Type function*: "function that is evaluated at compile-time given a type as its argument or returning a type."
	* `numeric_limits` : `numeric_limits<float>::min();`
	* Iterator traits
		* `template<typename C> using Value_type = typename C::value_type;`
		* *tag_dispatch*
		* *type predicates*
* `<utility>`
	* `pair`
	* `tuple`
* `<regex>`
* `<cmath>`
* `<numeric>`
* `<complex>`
* `<random>` (that uses an engine and a distribution)
* `<limits>`