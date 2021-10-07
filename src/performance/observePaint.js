import { isSupportPerformanceObserver } from './utils'
import { addCache } from '../utils/cache'
import { lazyReportCache } from '../utils/report'

export default function observePaint() {
    if (isSupportPerformanceObserver()) {
        const entryHandler = (list) => {        
            for (const entry of list.getEntries()) {
                if (entry.name === 'first-contentful-paint') {
                    observer.disconnect()
                }
    
                const json = entry.toJSON()
                delete json.duration
    
                const reportData = {
                    ...json,
                    subType: entry.name,
                    type: 'performance',
                }

                addCache(reportData)
                lazyReportCache()
            }
        }
    
        const observer = new PerformanceObserver(entryHandler)
        observer.observe({ type: 'paint', buffered: true })
    }
}