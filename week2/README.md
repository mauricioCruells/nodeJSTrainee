<a name="readme-top"></a>


<div align="center">

  <h3 align="center">RLE tool for decoding and encoding</h3>

  <p align="center">
    Basic implementation for RLE over text files, it allows for encoding and decoding using number first algorithm
  </p>
</div>


## About The Repo

Homework for week 2 of applaudo's trainee program, it's an implementation of the Run-Length Encoding algorithm using number first before letter to denote how many times should that letter repeat.

It has the ability to write to a .copy file aswell as output to the console.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Getting Started

### Prerequisites

You'll need Node.JS and npm installed to their latest version

### Installation

1. Clone the repo
```
git clone https://gitlab.com/trainee-nodejs/week2-rle.git
```
2. Install NPM packages and CLI tool on your Node environment
```
npm install -g
```

<p align="right">(<a href="#readme-top">back to top</a>)</p>


## Usage

This cli tool performs decoding algorithm by default.

### Decoding

If your have a text as follows inside a file called 'testEncoded.txt':

```
1H1e2l5o1 9w3o1r1l2d
```

you can do the following command to decode it:

```
rle testEncoded.txt
```

So you'll get the following decoded text:

```
Hellooooo wwwwwwwwwooorldd
```

### Encoding

You could add the -e flaw to signal that you want to encode text:

```
thiss neeedss encodingg
```
    
```
rle test.txt -e
```    

will output the following result to console and a file called test.txt.copy:

```
1t1h1i2s1 1n3e1d2s1 1e1n1c1o1d1i1n2g
```


<p align="right">(<a href="#readme-top">back to top</a>)</p>
