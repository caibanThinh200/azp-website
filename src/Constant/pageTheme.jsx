const Color = {
    brand: '#D32F2F',
    brand2: '#1ab394',
    secondary: {
        neutral_1: '#FFCA28',
        neutral_2: '#26A69A',
    },
    greys: {
        light_1: '#E5E5E5',
        light_2: '#9FA9BA',
        light_3: '#8C8CB1',
        light_4: '#F4F5FA',
        dark_1: '#686868',
        dark_2: '#2E384D',
        dark_3: '#787894',
    },
    status: {
        critical: '#E74C3C',
        warning: '#FFAA15',
        success: '#00C781',
        unknown: '#CCCCCC',
    },
};
const ParamsClass = {
    '@body-background': '#fff',
    '@wrapper-background': Color.greys.light_4,
    '@component-background': '#fff',
    // -------- Colors -----------
    '@primary-color': Color.brand2,
    '@success-color': Color.status.success,
    '@error-color': Color.status.critical,
    '@warning-color': Color.status.warning,
    '@normal-color': Color.greys.dark_1,
};
module.exports = {
    ParamsClass, Color
};
