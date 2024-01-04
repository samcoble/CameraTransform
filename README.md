# CameraTransform
![why](https://github.com/samcoble/CameraTransform/assets/32228102/385a701e-9970-466d-9598-142057df9fd9)

Experimentation with the Camera Transform.
Inspired by Professor Kenneth Joy, and his lecture series: [https://www.youtube.com/watch?v=mpTl003EXCY](https://www.youtube.com/playlist?list=PL_w_qWAQZtAZhtzPI5pkAtcUVgmzdAP8g)

<img src="https://github.com/samcoble/CameraTransform/assets/32228102/35ffb154-4b81-4399-8141-a4e5f34d405c" style="float:right" width="381" height="323">

Give it a go! Ctrl+F5 to clear cache and load the updated version.
[memspc.xyz](https://memspc.xyz/)

So far Google Chrome performs the best. I'm surprised Edge is slower than Chrome.

WebGL shader functions have access to the GPU and it's unique ability to process data in parallel. I'm sure that my use of WebGL here is not taking advantage of all that it can provide. I have kept things simple to follow along with Ken's lectures. Javascript and WebGL provide tremendous accessibility allowing all platforms to be supported.

This project is meant to be an endless exercise with the goal of developing intuition for the camera transform and the corresponding pipeline. 
It will be interesting to experiment with a 3D 'notepad' per se. One that can take on any idea and put it in 3D space.

Save & Load FIXED. So far handling any large amount of junk!
- Move objects with (V) or (Shift+T) as well. (Shift-T) works in sequence with translation (V)
- Tab finds nearest obj and right click will find nearest point in the obj. Right click also finds any points you have placed that are not made into an obj yet.
- (L) links two objects of equal size linearly.

I'm starting to get distracted using this rather than writing any code lol.
There's no limit here. Make any tool you can dream of. I'm hoping to generate moldable meshes and explore procedural noise at some point

So far ray tracing is working but I noticed in one test instance a surface would not be detected. It was detectable after saving and loading that save. Also I noticed when saving with Chrome the file was empty (0KB) despite having been labeled with the correct size upon creation.

Finally I have a poor man's painter's algorithm! Hopefully I can come up with a combination of algorithms to provide adequate clipping. If I can reduce the amount of draws by removing out of sight poly's it should be possible to start generating a real world map. Then comes color mapping and finally ~~simple sun light.~~ Maybe shaded slightly but I will eventually start over in a webgl environment.

I have ported a lot to webgl and the performance improvements are quite insane already. I am far from optimized. My perspective transform does not use the gl-matrix library which I really prefer. I realize now my code structure has worked out the way I wanted it to. I haven't taken advantage of what the vertex shaders can really do either. Memory management could be a lot better. I am hoping this will open doors to textures and maybe some simulation of physics. It's hard for me to grasp creating a physics event/interpolation that immediately is cut short by a second event.

![webgl](https://github.com/samcoble/CameraTransform/assets/32228102/d6daf04d-05c5-4484-a0c9-5047fe041b75)
![best](https://github.com/samcoble/CameraTransform/assets/32228102/c78772e6-341f-496f-9ed3-83243d5655b8)
![badartexedllfree](https://github.com/samcoble/CameraTransform/assets/32228102/0edfd5dc-f69f-454c-80f5-ff29e8853b75)
![opacity](https://github.com/samcoble/CameraTransform/assets/32228102/af285eac-080d-46c6-adc8-6358b8e845a2)
![boatpics](https://github.com/samcoble/CameraTransform/assets/32228102/3dae0e7a-140b-49b2-8d38-12be1603c392)
![firefox_mBzhPUKkHC](https://github.com/samcoble/CameraTransform/assets/32228102/147a573c-0c6a-49e2-9633-28e1f5fdc402)
![sight](https://github.com/samcoble/CameraTransform/assets/32228102/7596d805-3844-4424-a671-e18a67cb1fbc)
![goyin](https://github.com/samcoble/CameraTransform/assets/32228102/6e67584c-79a8-4406-8b77-01cad1497af6)
![newz](https://github.com/samcoble/CameraTransform/assets/32228102/19106736-ec6f-49ff-a570-44e8f76adb4d)
![RAYTRACE](https://github.com/samcoble/CameraTransform/assets/32228102/3e2c9a87-9128-42e7-bc4f-6aee4cc0fc76)
![STAIRGEN](https://github.com/samcoble/CameraTransform/assets/32228102/499964bd-483b-417d-8ea1-74b46ccec4f1)
![MOVE](https://github.com/samcoble/CameraTransform/assets/32228102/ef8d9f11-f2c2-46f8-a2e6-283a431f728d)
![rayz](https://github.com/samcoble/CameraTransform/assets/32228102/642ba171-ebf4-47db-8851-fd533c091c36)
![linker](https://github.com/samcoble/CameraTransform/assets/32228102/8a8411a2-cd39-480a-980e-874c6529ecf3)
![qq](https://github.com/samcoble/CameraTransform/assets/32228102/9da981a7-05ad-4940-b3d9-ebf9aa8188a2)
![musho](https://github.com/samcoble/CameraTransform/assets/32228102/2835a077-84fd-4285-b048-fdc2f344729c)
![cirsets](https://github.com/samcoble/CameraTransform/assets/32228102/d3bb6839-7c86-48b3-aea0-10174655bfce)
![newdrip](https://github.com/samcoble/CameraTransform/assets/32228102/4b9fff77-ec46-4c0f-b8be-aa4498910fed)
![botman](https://github.com/samcoble/CameraTransform/assets/32228102/308ae207-8c05-45d7-9f6e-3375862dda42)
![genderneutraldesktheythem](https://github.com/samcoble/CameraTransform/assets/32228102/8b5651b2-5644-41a9-815e-ab1863b02a4e)
![undo](https://github.com/samcoble/CameraTransform/assets/32228102/8d8362cc-caba-48fb-939d-2366f96e08e5)
Finally I can make simple 3d models =)
![great](https://github.com/samcoble/CameraTransform/assets/32228102/6fae7623-2369-4245-98fd-bbb6a218ba52)
![ye](https://github.com/samcoble/CameraTransform/assets/32228102/f0179d0f-3c6d-4fe8-be1c-3a7a191da6cc)


New wallpaper ayyo

![yemane](https://github.com/samcoble/CameraTransform/assets/32228102/9776e7f2-9d8e-444a-8106-3f9477ebd680)


