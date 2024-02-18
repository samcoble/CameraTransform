# CameraTransform
![why](https://github.com/samcoble/CameraTransform/assets/32228102/385a701e-9970-466d-9598-142057df9fd9)

Experimentation with the Camera Transform.
Inspired by Professor Kenneth Joy, and his lecture series: [https://www.youtube.com/watch?v=mpTl003EXCY](https://www.youtube.com/playlist?list=PL_w_qWAQZtAZhtzPI5pkAtcUVgmzdAP8g)

<img src="https://github.com/samcoble/CameraTransform/assets/32228102/35ffb154-4b81-4399-8141-a4e5f34d405c" style="float:right" width="381" height="313">

[memspc.xyz](https://memspc.xyz/)

Ctrl+F5 to clear cache and load the updated version.

Old 2D Canvas: [memspc.xyz/2dcanvas](https://memspc.xyz/2dcanvas)

So far Google Chrome performs the best. Google's javascript compiler V8 is superbly fast. 

Everything needs to be rewritten using WebAssembly & C++ before I continue improving the performance.

Save & load now work for all unique data created. The folder tree state is saved as well. Open/closed states are also saved!
I have limited folder names to use the following characters: A-Z, 0-9, period and spaces.

[ 2D CANVAS ] -> [ WEBGL-CANVAS ]

I have ported a lot to webgl and the performance improvements are quite insane but far from a native application. The perspective transform does not use the gl-matrix library. Textures require the correct orientation which I have yet to create a transform for. I tried a standard implementation of the view matrix 4f applied directly to the shader with the matrix library but I noticed a performance loss !? Ultimately the z-buffer should be a shader to reduce a future workload. I have yet to put Javascript (CPU) to work in any significant way. This application is not very CPU intense leaving me headroom to make further optimizations at an earlier stage in the memory pipeline.

![Screenshot 2024-02-13 204436](https://github.com/samcoble/CameraTransform/assets/32228102/75e57ec2-d004-4c47-b40f-996907ebe937)
![Screenshot 2024-02-14 104800](https://github.com/samcoble/CameraTransform/assets/32228102/ffe0bcf8-8ea0-4ca3-ab79-39fedb6bfd04)
![backfacecull](https://github.com/samcoble/CameraTransform/assets/32228102/5baf3c58-ead5-4f1d-9334-898dfaf6d3eb)
![NVIDIA](https://github.com/samcoble/CameraTransform/assets/32228102/5796f7f6-e08a-4e15-a02f-085735bfa242)
![best](https://github.com/samcoble/CameraTransform/assets/32228102/c78772e6-341f-496f-9ed3-83243d5655b8)
![badartexedllfree](https://github.com/samcoble/CameraTransform/assets/32228102/0edfd5dc-f69f-454c-80f5-ff29e8853b75)
![opacity](https://github.com/samcoble/CameraTransform/assets/32228102/af285eac-080d-46c6-adc8-6358b8e845a2)
![newz](https://github.com/samcoble/CameraTransform/assets/32228102/19106736-ec6f-49ff-a570-44e8f76adb4d)
![RAYTRACE](https://github.com/samcoble/CameraTransform/assets/32228102/3e2c9a87-9128-42e7-bc4f-6aee4cc0fc76)
![STAIRGEN](https://github.com/samcoble/CameraTransform/assets/32228102/499964bd-483b-417d-8ea1-74b46ccec4f1)
![MOVE](https://github.com/samcoble/CameraTransform/assets/32228102/ef8d9f11-f2c2-46f8-a2e6-283a431f728d)
![rayz](https://github.com/samcoble/CameraTransform/assets/32228102/642ba171-ebf4-47db-8851-fd533c091c36)
![linker](https://github.com/samcoble/CameraTransform/assets/32228102/8a8411a2-cd39-480a-980e-874c6529ecf3)
![musho](https://github.com/samcoble/CameraTransform/assets/32228102/2835a077-84fd-4285-b048-fdc2f344729c)
![cirsets](https://github.com/samcoble/CameraTransform/assets/32228102/d3bb6839-7c86-48b3-aea0-10174655bfce)
![undo](https://github.com/samcoble/CameraTransform/assets/32228102/8d8362cc-caba-48fb-939d-2366f96e08e5)
![great](https://github.com/samcoble/CameraTransform/assets/32228102/6fae7623-2369-4245-98fd-bbb6a218ba52)
![yemane](https://github.com/samcoble/CameraTransform/assets/32228102/9776e7f2-9d8e-444a-8106-3f9477ebd680)


