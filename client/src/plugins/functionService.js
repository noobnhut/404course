import dayjs from 'dayjs';

class functionService {
    formatDate(time) {
        return dayjs(time).format('DD-MM-YYYY');
    }
}
export default new functionService();