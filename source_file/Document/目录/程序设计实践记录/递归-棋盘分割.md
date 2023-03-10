
### 题目描述

将一个８*８的棋盘进行如下分割：将原棋盘割下一块矩形棋盘并使剩下部分也是矩形，再将剩下的部分继续如此分割，这样割了(n-1)次后，连同最后剩下的矩形棋盘共有n块矩形棋盘。(每次切割都只能沿着棋盘格子的边进行)

![img](./Figures/202303102343.jpg)

原棋盘上每一格有一个分值，一块矩形棋盘的总分为其所含各格分值之和。现在需要把棋盘按上述规则分割成n块矩形棋盘，并使各矩形棋盘总分的均方差最小。

均方差：

![img](./Figures/202303102344.jpg)

平均值：

![img](./Figures/202303102345.jpg)

xi为第i块矩形棋盘的总分。请编程对给出的棋盘及n，求出O'的最小值。

### 输入

第1行为一个整数n(1 < n < 15)。
第2行至第9行每行为8个小于100的非负整数，表示棋盘上相应格子的分值。每行相邻两数之间用一个空格分隔。

### 输出

仅一个数，为O'（四舍五入精确到小数点后三位）。

### 输入样例

#### 输入

```
3
1 1 1 1 1 1 1 3
1 1 1 1 1 1 1 1
1 1 1 1 1 1 1 1
1 1 1 1 1 1 1 1
1 1 1 1 1 1 1 1
1 1 1 1 1 1 1 1
1 1 1 1 1 1 1 0
1 1 1 1 1 1 0 3
```

#### 输出

```
1.633
```

### 实现代码

```c
#include <iostream>
#include <cstdio>
#include <cstring>
#include <cmath>
#include <algorithm>
using namespace std;
const int N = 10,M = 16;
int n;
double X,s[N][N],f[N][N][N][N][M];
double get(int x1,int y1,int x2,int y2){
    return s[x2][y2] - s[x1-1][y2] - s[x2][y1-1] + s[x1-1][y1-1];
}
double dfs(int x1,int y1,int x2,int y2,int k){
    double &v = f[x1][y1][x2][y2][k];
    if(v >= 0)  return v;
    if(k == 1){
        double s = get(x1,y1,x2,y2) - X;
        return v = s * s / n;
    }
    v = 1e9;
    for(int i = x1;i < x2;i++){
        double s1 = get(i + 1,y1,x2,y2) - X,s2 = get(x1,y1,i,y2) - X;
        v = min(v,dfs(x1,y1,i,y2,k-1) + s1 * s1 / n);
        v = min(v,dfs(i + 1,y1,x2,y2,k-1) + s2 * s2 / n);
    }
    for(int i = y1;i < y2;i++){
        double s1 = get(x1,i + 1,x2,y2) - X,s2 = get(x1,y1,x2,i) - X;
        v = min(v,dfs(x1,y1,x2,i,k-1) + s1 * s1 / n);
        v = min(v,dfs(x1,i + 1,x2,y2,k-1) + s2 * s2 / n);
    }
    return v;
}
int main(){
    cin>>n;
    for(int i = 1;i <= 8;i++){
        for(int j = 1;j <= 8;j++){
            cin>>s[i][j];
            s[i][j] += s[i-1][j] + s[i][j-1] - s[i-1][j-1];
        }
    }
    X = s[8][8] / n;
    memset(f,-1,sizeof f);
    printf("%.3lf\n",sqrt(dfs(1,1,8,8,n)));
    return 0;
}
```