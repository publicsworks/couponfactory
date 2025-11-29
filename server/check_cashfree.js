const { Cashfree, CFEnvironment } = require('cashfree-pg');

console.log('CFEnvironment:', CFEnvironment);

try {
    const cf = new Cashfree(CFEnvironment.SANDBOX, 'dummy', 'dummy');
    console.log('Instance Methods:', Object.getOwnPropertyNames(Object.getPrototypeOf(cf)));
} catch (e) {
    console.log('Error instantiating:', e.message);
}
