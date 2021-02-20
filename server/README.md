# Troper-API 
This is API server for troper service

# How to install
1. Install chrome via terminal
    ``` bash
    $ wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | sudo apt-key add -
    $ sudo sh -c 'echo "deb [arch=amd64] http://dl.google.com/lin
    ux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list'
    $ sudo apt-get update
    $ sudo apt-get install google-chrome-stable
    ```
2. Setting web driver
   1. Check chrome version
      ``` bash
      $ google-chrome --version
      ```

   2. Download web driver file      
      https://chromedriver.chromium.org/downloads

   3. Configure code
      
      ``` py
      # api/pyCode/crawlReview.py
      ...
      drivePath = '<put driver path here>' 
      ... 
      ```
3. Set requirements and Start
    ``` bash
    $ pip3 install -r requirements.txt
    $ npm install
    $ npm start
    ```

## If done
API Server is running on 0.0.0.0:8080

# API Document

## (1) POST /api/product
### Parameter
- url parameter
  > ?platform=\<string\>&link=\<string\>
  - platform : for now only amazon is supported
  - link : Amazon product link (url encoded)
  
### Result
- Success case
  - HTTP Status : 200
  - HTTP Body
    ```
    {
        token : string
    }
    ```
- Fail case
  - HTTP Status : 4xx or 5xx
  - HTTP Body
    ```
    {
        error_code : int,
        error_message : string
    }
    ```
## (2) GET /api/reviewAnalysis
### Parameter
- url parameter
  > ?token=\<string\>
  - token : Token returned from (1)
### Result
- Success case
  - HTTP Status : 200
  - HTTP Body
    ```
    {
        score_count : [
          <score> : <count>
        ],
        keyword_cloud : <image_link>,
        positive_keyword_cloud : <image_link>,
        negative_keyword_cloud : <image_link>
    }
    ```
- Fail case
  - HTTP Status : 4xx or 5xx
  - HTTP Body
    ```
    {
        error_code : int,
        error_message : string
    }
    ```

## (3) GET /api/trendAnalysis
### arameter
- url parameter
  > ?token=\<string\>&category=\<string\>&product_type=\<string\>
  - token : Token returned from (1)
  - category : 'fasion', ... 
  - product_type : 'shirt', ...
## Result
- Success case
  - HTTP Status : 200
  - HTTP Body
    ```
    {
      interest_over_time : [
        {
          period : string,
          score : int
        },
        ...
      ],
      interest_by_region : [
        {
          region : string,
          score : int 
        },
        ...
      ],
      related_topics : {
        top : [
          {
            topic : stirng,
            score : int
          },
          ...
        ],
        rising : [
          {
            topic : stirng,
            score : int
          },
          ...
        ]
      }
      related_query : {
        top : [
          {
            query : stirng,
            score : int
          },
          ...
        ],
        rising : [
          {
            query : stirng,
            score : int
          },
          ...
        ]
      }
    }
    ```
- Fail case
  - HTTP Status : 4xx or 5xx
  - HTTP Body
    ```
    {
        error_code : int,
        error_message : string
    }
    ```
