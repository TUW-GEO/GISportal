See https://github.com/pmlrsg/GISportal for details



# TUW

Plotting is done in python. To create a plot, data is required. Data comes from
the THREDDS via a data extraction request. The request is build in the Portal
and then sent to the plots.py module. Example request:

    json_request = '{"request":
        {"plot":{"type":"timeseries","title":"C3S_SM: Number of Valid Observations","style":"default",
        "downloadTypes":[{"key":"csv","label":"CSV"},{"key":"png","label":"PNG"},{"key":"meta-data","label":"Meta Data"},{"key":"logos","label":"Logos"},{"key":"svg","label":"SVG"}],
        "matchup_log":false,"xAxis":{"scale":"linear","label":"Date/Time","ticks":"auto","weight":"auto","tickFormat":"%d/%m/%Y"},
        "y1Axis":{"scale":"linear","label":"Number of Valid Observations - v202012 - C3S SM","userLabel":"Number of Valid Observations - v202012 - C3S SM","ticks":"auto","weight":"auto","tickFormat":"auto"},
        "data":{"series":[{"handler":"OPEC_SERVICE_WCS","data_source":{"coverage":"nobs","layer_id":"nobs__C3S_SM","t_bounds":["2015-05-09","2023-07-01"],"bbox":"-1.883,21.196,3.497,26.087",
        "threddsUrl":"http://container.geo.tuwien.ac.at:8484/thredds/wcs/C3S/combined/monthly/files/STACK_C3S-SOILMOISTURE_v202012_COMBINED_MONTHLY.nc"},"label":"1) Number of Valid Observations - v202012 - C3S SM","yAxis":1,
        "userLabel":"Number of Valid Observations - v202012 - C3S SM","type":"line","meta":"Region: undefined<br>Confidence: undefined<br>Provider: C3S_SM<br>Interval: monthly<br>Bounding Box: -1.883,21.196,3.497,26.087<br>"}]}},
        "style":{"logos":[]}}
    }'


## Dimenions

The data extractor will create a subset of the stack online. It seems that in THREDDS v5
the `_CoordinateAxisType` attribute is not longer forwarded to the subset, but this
is needed by the python module to detect the time dimension. Therefore make sure
that the time dimension is called 'time' or 'Time' in the global stacks.
