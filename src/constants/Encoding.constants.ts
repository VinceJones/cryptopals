enum HEX {
    text = "hex",
    value = 16,
};

enum BASE_64 {
    text = 'base64',
    value = 2,
};

enum BINARY {
    text = 'binary',
    value = 2,
};

enum DECIMAL {
    text = 'decimal',
    value = 10,
};

enum ASCII {
    text = 'ascii',
};

enum UTF8 {
    text = 'utf8',
}

const Encoding = {
    HEX,
    BASE_64,
    BINARY,
    DECIMAL,
    ASCII,
    UTF8,
}

export default Encoding;