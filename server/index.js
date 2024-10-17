 decrypt = (encryption) => {
    const decipher = crypto.createDecipheriv(
        "aes-256-ctr",
        Buffer.from(secret),
        Buffer.from(encryption.iv,'hex')
    );

    const decryptedPassword = Buffer.concat([
        decipher.update(Buffer.from(encryption.password,'hex')),
        decipher.final()
    ]);

    return decryptedPassword.toString();
}