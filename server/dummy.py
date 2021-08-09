# from base64 import b64encode
# from IPython.display import Image
# import pandas as pd
# import numpy as np
# import requests
# import json
# import os
# import fitz

# # import sys, fitz  # import the binding
# # fname = sys.argv[1]  # get filename from command line
# # doc = fitz.open('pdf2.pdf')  # open document
# # zoom_x = 2.0  # horizontal zoom
# # zomm_y = 2.0  # vertical zoom
# # mat = fitz.Matrix(zoom_x, zomm_y)  # zoom factor 2 in each dimension

# # for page in doc:  # iterate through the pages
# #     pix = page.getPixmap()  # render page to an image
# #     pix.writePNG("page-%i.png" % page.number)
# pdffile = "./multer/cancer signalling 2003 review.pdf"
# doc = fitz.open(pdffile)
# page = doc.loadPage(0)  # number of page
# pix = page.getPixmap()
# output = "cancer.png"
# pix.writePNG(output)
# # output="pdf3.png"
# def makeImageData(imgpath):
#     img_req = None
#     with open(imgpath, 'rb') as f:
#         ctxt = b64encode(f.read()).decode()
#         img_req = {
#             'image': {
#                 'content': ctxt
#             },
#             'features': [{
#                 'type': 'DOCUMENT_TEXT_DETECTION',
#                 'maxResults': 1
#             }]
#         }
#     return json.dumps({"requests": img_req}).encode()

# def requestOCR(ENDPOINT_URL):
#   imgdata = makeImageData(output)
#   response = requests.post(ENDPOINT_URL, 
#                            data = imgdata, 
#                            params = {'key': 'AIzaSyCgmVpDWyd1JPtuRxU7A2W3V9hO09RXo18'}, 
#                            headers = {'Content-Type': 'application/json'})
#   return response

# ENDPOINT_URL = 'https://vision.googleapis.com/v1/images:annotate'

# result = requestOCR(ENDPOINT_URL)

  
# if result.status_code != 200 or result.json().get('error'):
#     print ("Error")
# else:
#     result = result.json()['responses'][0]['textAnnotations']

# j=0
# for i in range(1,len(result)):
#     result[i]["boundingPoly"]["vertices"][0].setdefault("y",0)
#     result[i]["boundingPoly"]["vertices"][1].setdefault("y",0)
#     j=j+1
# print(j)

import os
import sys
import json
from pdfminer.layout import LAParams, LTTextBox
from pdfminer.pdfpage import PDFPage
from pdfminer.pdfinterp import PDFResourceManager
from pdfminer.pdfinterp import PDFPageInterpreter
from pdfminer.converter import PDFPageAggregator
import pandas as pd
fp = open(sys.argv[1], 'rb')
rsrcmgr = PDFResourceManager()
laparams = LAParams()
device = PDFPageAggregator(rsrcmgr, laparams=laparams)
interpreter = PDFPageInterpreter(rsrcmgr, device)
pages = PDFPage.get_pages(fp)
actualvoice=[]
pageNo=[]
content=[]
x1=[]
y1=[]
x22=[]
y22=[]
i=1
textLen=[]
for page in pages:
    
   
    interpreter.process_page(page)
    layout = device.get_result()
   
    for lobj in layout:
        if isinstance(lobj, LTTextBox):
            x, y , x12, y12,text = lobj.bbox[0],lobj.bbox[1],lobj.bbox[2],lobj.bbox[3], lobj.get_text()
#             print('At %r is text: %s' % ((x, y), text))
#             print(text)
            content.append(text)
            pageNo.append(i)
            x1.append(x)
            y1.append(y)
            x22.append(x12)
            y22.append(y12)
            textLen.append(len(text))
            actualvoice.append(text+".")
#             print(lobj.bbox[2])
            
    
           
#     arr.append("Moving to next page.")
#     print("moving outside")
    i=i+1

# print(len(x1),len(y1),len(pageNo),len(content))
d1=pd.DataFrame({"page No.":pageNo,"content":content,"x coord":x1, "y coord":y1,"x2":x22, "y2":y22, "textLength":textLen})
text_content=d1["content"]
content=json.dumps(text_content.to_dict())
list1=[]
c=''
g=json.dumps(d1["content"].to_dict())
b=d1["content"].to_dict()
for i in range(max(b.keys())):
    list2=[]
    str1=''
    for j in range(len(b[i])):
        if(b[i][j]=='\n'):
            list2.append('<br>~~~')
        else:
            list2.append(b[i][j])
    str2=str1.join(list2)
    list1.append(str2)
m=c.join(list1)



with open(os.path.join('./text',sys.argv[2]+'.txt'),"w",encoding="utf-8") as pdfcontent:

    pdfcontent.write(m)
    
# import osc
# import pandas as pdd
# d=pd.DataFrame({"username":[1,2,3,4,5]})
# print("this is pandas {pd}",d)
# # print("PYTHONPATH:", os.environ.get('PYTHONPATH'))
# # print("PATH:", os.environ.get('PATH'))

import os
import fitz
doc = fitz.open(sys.argv[1])

if os.path.isdir('./Images/'+sys.argv[2]):
        for i in range(len(doc)):
            for img in doc.getPageImageList(i):
                xref = img[0]
                pix = fitz.Pixmap(doc, xref)
                if pix.n < 5:       # this is GRAY or RGB
                    pix.writePNG("./Images//%s/%s.png" % (sys.argv[2],i))
                    
                else:               # CMYK: convert to RGB first
                    pix1 = fitz.Pixmap(fitz.csRGB, pix)
                    pix1.writePNG("./Images/%s/%s.png" % (sys.argv[2],i))
                    pix1 = None
                pix = None
else:
    os.mkdir("./Images/"+sys.argv[2])
    for i in range(len(doc)):
            for img in doc.getPageImageList(i):
                xref = img[0]
                pix = fitz.Pixmap(doc, xref)
                if pix.n < 5:       # this is GRAY or RGB
                    pix.writePNG("./Images/%s/%s.png" % (sys.argv[2],i))
                    
                else:               # CMYK: convert to RGB first
                    pix1 = fitz.Pixmap(fitz.csRGB, pix)
                    pix1.writePNG("./Images/%s/%s.png" % (sys.argv[2],i))
                    pix1 = None
                pix = None

print("hi")       