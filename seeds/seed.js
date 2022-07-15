const DB = require('../models/index')

DB.sequelize.sync({force: true}).then(async function() {


    await DB.Band.create({
        name: 'test_band_1',
        genre: 'super cool',
    })

    await DB.Event.create({
        name: 'Lollapalooza'

    })

    await DB.MeetGreet.create({
        event_id: 1,
        band_id: 1
    })
    
    await DB.Stage.create({
        stage_name: 'Main Stage'
    })

    await DB.StageEvent.create({
        stage_id: 1,
        event_id: 1
    })
    
    await DB.SetTime.create({
        event_id: 1,
        stage_id: 1,
        band_id: 1
    })

})