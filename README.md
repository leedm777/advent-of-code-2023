# advent-of-code-2023

Solutions for [Advent of Code, 2023](https://adventofcode.com/2023).

I decided to take it easy and just stick with what I know this year, so
Node.js it is!

## Prep script

I've got a `./prep.sh` script to download the input and generate stubs for each
day's puzzle. This requires `.cookies.txt` to have the AoC Session cookie for
authentication. The best way to capture the cookie is to login to AoC in an
incognito window so you can get the initial `Set-Cookie` header.

    set-cookie: session=XXXX; Expires=Mon, 29-Nov-2032 01:48:22 GMT; Path=/; HttpOnly; Secure
