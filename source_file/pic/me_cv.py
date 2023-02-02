import cv2

img = cv2.imread('./ocr-func.png')
img = cv2.resize(img, [300, 201])
cv2.imshow('img', img)
cv2.waitKey(0)
cv2.imwrite('ocr_300_201.png', img)