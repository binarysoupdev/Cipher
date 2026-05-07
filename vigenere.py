def vigenere(input, key, decrypt=False):
    OFFSET = ord('A')
    output = ''

    dir = 1
    if decrypt: dir = -1

    for i in range(len(input)):
        c = ord(input[i].upper()) - OFFSET

        if c < 0 or c >= 26:
            output += input[i]
            continue

        c += dir * ord(key[i%len(key)].upper()) - OFFSET
        output += chr(c % 26 + OFFSET)
    
    return output


import argparse
parser = argparse.ArgumentParser(
    prog = 'Vigenere',
    description = 'Encrypt/Decrypt using a vigenere cipher',
)

parser.add_argument('input', help='The input text (plain or cipher)')
parser.add_argument('key', help='The key to use in the cipher')
parser.add_argument('-d', '--decrypt', action='store_true', help="Perform decryption") 

args = parser.parse_args()
print(vigenere(args.input, args.key, args.decrypt))
