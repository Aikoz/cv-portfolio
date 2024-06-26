
export async function sha256 (data: string ) {
    const textAsBuffer = new TextEncoder().encode(data);
    const hashBuffer = await window.crypto.subtle.digest('SHA-256', textAsBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer))
    const digest = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return digest;
  }
  
//  test('base64 decode', () => {
//    expect(encode(str)).toEqual(b64)
//  });
//  
//  test('base64 encode/decode', () => {
//    expect(decode(encode(str))).toEqual(str)
//  });