# CameraTransform
![why](https://github.com/samcoble/CameraTransform/assets/32228102/385a701e-9970-466d-9598-142057df9fd9)


Experimentation with the Camera Transform.
Inspired by Professor Kenneth Joy, and his lecture series: [https://www.youtube.com/watch?v=mpTl003EXCY](https://www.youtube.com/playlist?list=PL_w_qWAQZtAZhtzPI5pkAtcUVgmzdAP8g)

 .
 .
 .
<img src="https://github.com/samcoble/CameraTransform/assets/32228102/35ffb154-4b81-4399-8141-a4e5f34d405c" width="381" height="323">



Give it a go! Ctrl+F5 to clear cache and load the updated version.
[memspc.xyz](https://memspc.xyz/)

So far Google Chrome performs the best. I'm surprised Edge is slower than Chrome.

~~This project will need to be refactored before I continue adding features.~~ I'm going to continue to add new features and work on building structures that carry over to a better engine in the future. WebGL shader functions have access to the GPU and it's unique ability to process data in parallel. So far this app uses about 3% of my GPU... For this application the back end webGL will be very small as it's only job will be to provide allocation and manipulation of Float32Arrays made accessible to javascript. I'm sure that my use of WebGL here is not taking advantage of all that it can provide. I would prefer to write this in C++ as the pointer system is very good for this type of project but html&javascript provide tremendous accessibility.

This project is meant to be an endless exercise of mathematics with the goal of developing intuition for the camera transform and the corresponding pipeline. 
It will be very interesting to experiment with a 3D 'notepad' per se. One that can take on any idea and put it in 3D space. Spatial memory opposed to ?

Save & Load FIXED. So far handling any large amount of junk!
- Move objects with (V) or (Shift+T) as well. (Shift-T) works in sequence with translation (V)
- Tab finds nearest obj and right click will find nearest point in the obj. Right click also finds any points you have placed that are not made into an obj yet.
- (L) links two objects of equal size linearly.
- ZIGZAG is now broken.


I'm starting to get distracted using this rather than writing any code lol.
There's no limit here. Make any tool you can dream of. I'm hoping to generate moldable meshes and maybe explore the use of procedural noise at some point. https://youtu.be/9kaIXkImCAM

![STAIRGEN](https://github.com/samcoble/CameraTransform/assets/32228102/499964bd-483b-417d-8ea1-74b46ccec4f1)
![MOVE](https://github.com/samcoble/CameraTransform/assets/32228102/ef8d9f11-f2c2-46f8-a2e6-283a431f728d)
![GRID](https://github.com/samcoble/CameraTransform/assets/32228102/4c6ec41b-14de-440e-a175-2f30474f6f67)
![linker](https://github.com/samcoble/CameraTransform/assets/32228102/8a8411a2-cd39-480a-980e-874c6529ecf3)
![silly](https://github.com/samcoble/CameraTransform/assets/32228102/7537df5d-1554-4ffe-a317-be004525830f)
![Screenshot 2023-11-16 025203](https://github.com/samcoble/CameraTransform/assets/32228102/9da981a7-05ad-4940-b3d9-ebf9aa8188a2)
![mush](https://github.com/samcoble/CameraTransform/assets/32228102/9f91a91a-47f1-4e07-83c8-b47b7c873516)
![musho](https://github.com/samcoble/CameraTransform/assets/32228102/2835a077-84fd-4285-b048-fdc2f344729c)
![proger](https://github.com/samcoble/CameraTransform/assets/32228102/75924dff-5155-442d-86d0-5635b933413c)
![prog](https://github.com/samcoble/CameraTransform/assets/32228102/8e3ccc3c-def0-423b-9bf5-8f02227130e8)
![goodfeats](https://github.com/samcoble/CameraTransform/assets/32228102/05d36980-58e2-44b9-9112-bc1b284a27ed)
![cirsets](https://github.com/samcoble/CameraTransform/assets/32228102/d3bb6839-7c86-48b3-aea0-10174655bfce)
![newdrip](https://github.com/samcoble/CameraTransform/assets/32228102/4b9fff77-ec46-4c0f-b8be-aa4498910fed)
![guuuder](https://github.com/samcoble/CameraTransform/assets/32228102/e0315b20-5aa3-407f-83ba-0ae2eec1db55)
![botman](https://github.com/samcoble/CameraTransform/assets/32228102/308ae207-8c05-45d7-9f6e-3375862dda42)
![genderneutraldesktheythem](https://github.com/samcoble/CameraTransform/assets/32228102/8b5651b2-5644-41a9-815e-ab1863b02a4e)
![undo](https://github.com/samcoble/CameraTransform/assets/32228102/8d8362cc-caba-48fb-939d-2366f96e08e5)
![fileload](https://github.com/samcoble/CameraTransform/assets/32228102/b84daf1d-51e0-4ee2-b153-21d5fddbe8b6)
Finally I can make simple 3d models =)
![great](https://github.com/samcoble/CameraTransform/assets/32228102/6fae7623-2369-4245-98fd-bbb6a218ba52)
Painting vertices with a line plane intersection. The beginning of object creation. At some point curvature will be a wide syntax.
![mobetter](https://github.com/samcoble/CameraTransform/assets/32228102/dca1fa37-da05-4b5e-8b8d-ebd529c90355)
![ye](https://github.com/samcoble/CameraTransform/assets/32228102/f0179d0f-3c6d-4fe8-be1c-3a7a191da6cc)


Example of a new object being created at the aim location. Center screen currently does not align with the floor plane intersection :D
![g](https://github.com/samcoble/CameraTransform/assets/32228102/0bbd117e-f5ca-4d56-8144-c33f8c18b458)


New wallpaper ayyo

![yemane](https://github.com/samcoble/CameraTransform/assets/32228102/9776e7f2-9d8e-444a-8106-3f9477ebd680)


