#include <cstddef>
#include <cstdlib>
#include <iostream>
#include <string>
#include <Windows.h>
#include <chrono>
#include <thread>
#include <cmath>
#include <vector>

CONSOLE_SCREEN_BUFFER_INFO csbi;

/// Proto \\\

void updateConsoleBuffer(const CHAR_INFO* buffer, COORD bufferSize, COORD bufferCoord, SMALL_RECT& writeRegion);
void updateConsoleSize(int* w, int* h);
void mat_mult(std::vector<float>* result, const std::vector<std::vector<float>*>& mat_l, size_t _s);
void n4f_mat(std::vector<float>& m, std::vector<float>& _c, std::vector<float>* p, size_t _quant);
void initMat(std::vector<float>* mat, int size);
void drawPoint(CHAR_INFO* buffer, std::vector<float>& _pts, size_t _s, int w, int h);

std::vector<std::vector<float>*> mat_list;
std::vector<std::vector<float>*> mat_list2;

int main()
{
  int consoleWidth, consoleHeight, xPos = 0;
  HANDLE hConsole = GetStdHandle(STD_OUTPUT_HANDLE);

  std::vector<float> cubePoints =
  {
    -1.0f, -1.0f, -1.0f, 1.0f,
    1.0f, -1.0f, -1.0f, 1.0f,
    1.0f,  1.0f, -1.0f, 1.0f,
    -1.0f,  1.0f, -1.0f, 1.0f,
    -1.0f, -1.0f,  1.0f, 1.0f,
    1.0f, -1.0f,  1.0f, 1.0f,
    1.0f,  1.0f,  1.0f, 1.0f,
    -1.0f,  1.0f,  1.0f, 1.0f
  };

  int face_area = 10 * 10;
  std::vector<float> n4f_face(face_area * 4);
  std::vector<float> n4f_face_ghost(face_area * 4);
  for (int i = 0; i < face_area; i++) {
    int x = i % 10;
    int y = i / 10;
    n4f_face_ghost[i * 4] = x * 2;
    n4f_face_ghost[i * 4 + 1] = y * 2;
    n4f_face_ghost[i * 4 + 2] = 0;
    n4f_face_ghost[i * 4 + 3] = 1;
  }

  std::vector<float> cube_f(32);

  float _theta = 1.0f;

  std::vector<float> mat_rz(16);
  std::vector<float> mat_ry(16);
  std::vector<float> mat_rx(16);
  std::vector<float> mat_f(16);
  std::vector<float> mat_f2(16);
  std::vector<float> mat_buf(16);
  std::vector<float> mat_s(16);
  std::vector<float> mat_s2(16);
  std::vector<float> mat_per(16);
  std::vector<float> mat_t(16);

  initMat(&mat_rz, 16);
  initMat(&mat_ry, 16);
  initMat(&mat_rx, 16);
  initMat(&mat_f, 16);
  initMat(&mat_f2, 16);
  initMat(&mat_buf, 16);
  initMat(&mat_s, 16);
  initMat(&mat_s2, 16);
  initMat(&mat_per, 16);
  initMat(&mat_t, 16);

  mat_list.push_back(&mat_per);
  mat_list.push_back(&mat_t);
  mat_list.push_back(&mat_s);
  mat_list.push_back(&mat_ry);
  mat_list.push_back(&mat_rz);

  mat_list2.push_back(&mat_per);
  mat_list2.push_back(&mat_t);
  mat_list2.push_back(&mat_s2);
  mat_list2.push_back(&mat_ry);
  mat_list2.push_back(&mat_rz);

  while (true)
  {
    _theta += 0.01f;

    float _nt = _theta;
    mat_rz[0] = cosf(_theta);
    mat_rz[1] = -sinf(_theta);
    mat_rz[4] = sinf(_theta);
    mat_rz[5] = cosf(_theta);

    mat_ry[0] = cosf(_theta);
    mat_ry[2] = sinf(_theta);
    mat_ry[8] = -sinf(_theta);
    mat_ry[10] = cosf(_theta);

    float _sc = 1.0f;
    mat_s[0] = _sc;
    mat_s[5] = 0.5f*_sc;
    mat_s[10] = _sc;

    _sc = 12.0f;
    mat_s2[0] = _sc;
    mat_s2[5] = 0.5f*_sc;
    mat_s2[10] = _sc;

    mat_t[3] = static_cast<float>(consoleWidth/2.0f-1);
    mat_t[7] = static_cast<float>(consoleHeight/2.0f-1);

    mat_mult(&mat_f, mat_list, static_cast<size_t>(5));
    mat_mult(&mat_f2, mat_list2, static_cast<size_t>(5));
    n4f_mat(mat_f, n4f_face_ghost, &n4f_face, static_cast<size_t>(face_area));
    n4f_mat(mat_f2, cubePoints, &cube_f, static_cast<size_t>(8));

    // system("pause");

    updateConsoleSize(&consoleWidth, &consoleHeight);

    SMALL_RECT windowSize = { 0, 0, static_cast<SHORT>(consoleWidth - 1), static_cast<SHORT>(consoleHeight - 1) };
    SetConsoleWindowInfo(hConsole, TRUE, &windowSize);

    CHAR_INFO buffer[consoleWidth * consoleHeight];

    for (int i = 0; i < consoleWidth * consoleHeight; ++i) {
      char myString = ' ';
      buffer[i].Char.UnicodeChar = myString;
      buffer[i].Attributes = FOREGROUND_GREEN | FOREGROUND_INTENSITY;
    }

    std::string _str = "[ "+std::to_string(n4f_face[4])+", "+std::to_string(n4f_face[5])+", "+std::to_string(n4f_face[6])+" ]";

    for (int j = 0; j<_str.length(); j++) {
      buffer[j].Char.UnicodeChar = _str[j];
      buffer[j].Attributes = FOREGROUND_GREEN | FOREGROUND_INTENSITY;
    }

    // size_t _s = sizeof(_pts) / sizeof(_pts[0]);
    drawPoint(buffer, cube_f, static_cast<size_t>(8), consoleWidth, consoleHeight);
    drawPoint(buffer, n4f_face, static_cast<size_t>(face_area), consoleWidth, consoleHeight);

    COORD bufferSize = { static_cast<SHORT>(consoleWidth), static_cast<SHORT>(consoleHeight) };
    COORD bufferCoord = { 0, 0 };
    SMALL_RECT writeRegion = { 0, 0, static_cast<SHORT>(consoleWidth - 1), static_cast<SHORT>(consoleHeight - 1) };

    updateConsoleBuffer(buffer, bufferSize, bufferCoord, writeRegion); // Update the console buffer

    xPos = (xPos + 1) % consoleWidth;
    std::this_thread::sleep_for(std::chrono::milliseconds(5));
  }
  return 0;
}

// One line modulo this later
void drawPoint(CHAR_INFO* buffer, std::vector<float>& _pts, size_t _s, int w, int h) {
  for (size_t i = 0; i<_s; i++)
  {
    int _c = static_cast<int>(_pts[i*4]) + w*static_cast<int>(_pts[i*4+1]);
    if (_c <= w*h && _c >= 0) {
      buffer[_c].Char.UnicodeChar = 'X';
      buffer[_c].Attributes = FOREGROUND_RED | 10+static_cast<int>(_pts[i*4+2]);
    }
  }
}

void mat_mult(std::vector<float>* result, const std::vector<std::vector<float>*>& mat_l, size_t _s) {
  std::vector<float> buf(16, 0.0f); // Initialize buf vector with zeros
  initMat(&buf, 16);
  for (size_t q = 0; q < _s; ++q) {
    std::vector<float> temp_result(16, 0.0f); // Temporary result for each matrix multiplication
    for (int i = 0; i < 4; ++i) {
      for (int j = 0; j < 4; ++j) {
        for (int k = 0; k < 4; ++k) {
          temp_result[i * 4 + j] += buf[i * 4 + k] * (*(mat_l[q]))[k * 4 + j];
        }
      }
    }
    buf.assign(temp_result.begin(), temp_result.end());
  }
  // std::cout << std::to_string(buf[1]) << std::endl; 
  *result = buf; // Assign the final result to the output vector
}

void n4f_mat(std::vector<float>& m, std::vector<float>& _c, std::vector<float>* p, size_t _quant) {
  for (size_t q = 0; q<_quant; q++) {
    (*p)[4*q] = m[0] * _c[4*q] + m[1] * _c[4*q+1] + m[2] * _c[4*q+2] + m[3] * _c[4*q+3];
    (*p)[4*q+1] = m[4] * _c[4*q] + m[5] * _c[4*q+1] + m[6] * _c[4*q+2] + m[7] * _c[4*q+3];
    (*p)[4*q+2] = m[8] * _c[4*q] + m[9] * _c[4*q+1] + m[10] * _c[4*q+2] + m[11] * _c[4*q+3];
    (*p)[4*q+3] = m[12] * _c[4*q] + m[13] * _c[4*q+1] + m[14] * _c[4*q+2] + m[15] * _c[4*q+3];
  }
}

void initMat(std::vector<float>* mat, int size) {
  (*mat).resize(size);
  for (int i = 0; i < size; ++i) {
    (*mat)[i] = (i % 5 == 0) ? 1.0f : 0.0f;
  }
}

void updateConsoleBuffer(const CHAR_INFO* buffer, COORD bufferSize, COORD bufferCoord, SMALL_RECT& writeRegion)
{ HANDLE hConsole = GetStdHandle(STD_OUTPUT_HANDLE);
  WriteConsoleOutput(hConsole, buffer, bufferSize, bufferCoord, &writeRegion);
}

void updateConsoleSize(int* w, int* h) {
  GetConsoleScreenBufferInfo(GetStdHandle(STD_OUTPUT_HANDLE), &csbi);
  *w = csbi.srWindow.Right - csbi.srWindow.Left + 1;
  *h = csbi.srWindow.Bottom - csbi.srWindow.Top + 1;
}

