import pytz,time
from datetime import datetime
def utc2local(utc_st):
    now_stamp = time.time()
    local_time = datetime.fromtimestamp(now_stamp)
    utc_time = datetime.utcfromtimestamp(now_stamp)
    offset = local_time - utc_time
    local_st = utc_st + offset
    return local_st.strftime("%Y-%m-%d %H:%M:%S")