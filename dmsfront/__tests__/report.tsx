import {describe, expect, test, it, beforeEach, beforeAll} from '@jest/globals';
import report from '../src/components/report/report.tsx';



describe('report tests', () =>{
    it('writes a valid report to the db', () => {
        const newReport = {
            firstName: 'Jamie',
            lastName: 'Tait',
            role: 'Boss',
            age: 33,
              };
        const result = report.sync(newReport)
        });

        
});