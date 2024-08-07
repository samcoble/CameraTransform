# CameraTransform
![why](https://github.com/samcoble/CameraTransform/assets/32228102/385a701e-9970-466d-9598-142057df9fd9)

Experimentation with the Camera Transform.
Inspired by Professor Kenneth Joy, and his lecture series: [https://www.youtube.com/watch?v=mpTl003EXCY](https://www.youtube.com/playlist?list=PL_w_qWAQZtAZhtzPI5pkAtcUVgmzdAP8g)

<img src="https://github.com/samcoble/CameraTransform/assets/32228102/35ffb154-4b81-4399-8141-a4e5f34d405c" style="float:right" width="381" height="313">

[memspc.xyz](https://memspc.xyz/)

Ctrl+F5 to clear cache and load the updated version.

Old 2D Canvas: [memspc.xyz/2dcanvas](https://memspc.xyz/2dcanvas)

So far Google Chrome performs the best. Google's javascript compiler V8 is superbly fast. 

Save & load now work for all unique data created. The folder tree state is saved as well. Open/closed states are also saved!
I have limited folder names to use the following characters: A-Z, 0-9, period and spaces.

[ 2D CANVAS ] -> [ WEBGL-CANVAS ]

I have ported a lot to webgl and the performance improvements are quite insane but far from a native application. The perspective transform does not use the gl-matrix library. Textures require the correct orientation which I have yet to create a transform for. I tried a standard implementation of the view matrix 4f applied directly to the shader with the matrix library but I noticed a performance loss !? Ultimately the z-buffer should be a shader to reduce a future workload. Javascript only runs so fast you know.

My math here is maybe wrong but the paint tool is fairly accessible now. I have noticed my initial idea to hijack spacial memory by providing a 3D context actually worked out. I will have to use it more to determine if there is any noticeable advantage. I have a few simple things I can apply to the way the paint tool works to help produce a more true representation of what is drawn. Lines will also be run through a simple algorithm to reduce their 'noise' and help smooth things out.



![191730](https://github.com/user-attachments/assets/872c9590-70b9-48fa-b9af-743670839f0c)
![204828](https://github.com/user-attachments/assets/c375516e-2fff-4591-8c76-835d9c3dac43)
![133802](https://github.com/samcoble/CameraTransform/assets/32228102/938919da-2ca4-4040-ac9c-2574d58a5190)
![005917](https://github.com/samcoble/CameraTransform/assets/32228102/ad118f58-29c4-455f-879e-8b41b11601de)
![204436](https://github.com/samcoble/CameraTransform/assets/32228102/75e57ec2-d004-4c47-b40f-996907ebe937)
![220450](https://github.com/samcoble/CameraTransform/assets/32228102/6161a4a4-5c90-438f-927b-74b33588f122)
![backfacecull](https://github.com/samcoble/CameraTransform/assets/32228102/5baf3c58-ead5-4f1d-9334-898dfaf6d3eb)
![best](https://github.com/samcoble/CameraTransform/assets/32228102/c78772e6-341f-496f-9ed3-83243d5655b8)
![220347](https://github.com/user-attachments/assets/89c6742e-b228-4f4e-afb6-566dd71fcc37)
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


