<div class="widgetAuthoring">
    <div class="widgetTop typeLogic">
        <div class="title dragHandle">
        { widget:title } <div class="remove">x</div>
        </div>
    </div>

    <div class="widgetLeft">
        <div class='inlets'>
            <div rv-each-inlet="widget:ins" rv-alt="inlet.title" rv-data-field="inlet.to" class='inlet'>&middot;</div>
        </div>
    </div>


    <div class="widgetBody">
		
		
    </div>

    <div class="widgetRight">
        <div class='outlets'>
            <div class="outlet" rv-each-outlet="widget:outs" rv-alt="outlet.title" rv-data-field="outlet.to">&middot;</div>
        </div>
    </div>
            
    <div class="widgetBottom">
        <div class="tab"><p>more</p></div>
        <div class="content">
            <div class="ifNumber">
                <label>&#126;= range</label> <input class="moreParam" type="text" rv-value="widget:compareRange"><br>
                <label>wait true</label> <input class="moreParam" type="text" rv-value="widget:waitTimeTrue"><br>
                <label>wait false</label> <input class="moreParam" type="text" rv-value="widget:waitTimeFalse"><br>
            </div>
            <div class="ifText">
                text comparison string<br>
                <textarea class="database" rv-value="widget:text_comparison" rows="4" cols="70"></textarea>
            </div>
        </div>
    </div>
</div>