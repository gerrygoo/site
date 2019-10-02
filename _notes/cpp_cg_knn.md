##Computer graphics special

Ok, maybe this is not a 'special' post as much as it is.. that I was unable to follow the study schedule today. But I did study something. And I did learn something.

I actually went to see the professor of my computer graphics class to ask him about some extra stuff I'd like to implement for [the gpu particle system project I implemented](https://www.reddit.com/r/opengl/comments/brknay/my_computer_graphics_class_final_project_using/) at the end of the semester.

I'd like to be able to simulate gravitational attraction between the particles and... it turns out that doing that involves basically solving a 3D [k-nearest neighbors](https://en.wikipedia.org/wiki/K-nearest_neighbors_algorithm) problem! ):  
It also turns out that conceivable solutions entail basically having a partition 3D space and then updating it and querying it for every particle-for every frame.

I originally thought of having a large 3D matrix but some 'back of the envelope' calculations I did suggest that the subdivision of space I'd be able to achieve with the memory available in the graphics card on my laptop isn't as granular as I'd like it to be. n^3 grows quite fast!

I'd read that you can use a super-complicated data structure to optimize the memory usage. I was scared. I didn't quite make the conection before today, and it seems pretty obvious in retrospective but this is a lot like an ICPC ranged query problem. And the data structure in question is very much like a segment tree, but for 3D space!  

That realization made it look waay less scary to me, and I think I'll actually try to do it. The main problem now is implementing that data structure in the weird C-like GLSL. I'd also have to get another computer or use some plugin on mine that allowed me to use compute shaders in mine since I'm only able to get OpenGL 4.1 at the moment.