import moment from 'moment'

import { computed } from 'vue'

export default function useTimeFormat() {
    const timeRef = computed({
        get() {
            return data => {
                const time = moment(data).format('YY-MM-DD:LT')
                return time
            }
        }
    })
    return {
        timeRef
    }
}
