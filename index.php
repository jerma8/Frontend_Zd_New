<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Frontend zadatak</title>


    <link href='https://fonts.googleapis.com/css?family=Open+Sans' rel='stylesheet' type='text/css'>

    <link href="css/style.css" rel="stylesheet">

</head>
<body>





<div class="fullContent">
    <div class="blurDiv"></div>


    <div id="left" class="sidebar leftSidebar">
        <ul id="selectLanguage">
        </ul>
    </div>

    <div id="right" class="sidebar rightSidebar">
        <ul id="games">
        </ul>
    </div>


    <div class="row menu push">
        <div class="col0_5lg col_lg_offSet_0_5 col_md_offSet_0_5 col_sm_offSet_0_5 col_xs_offSet_0_5">
            <a href="#">
                <img class="filterImg" src="img/filter.png" alt="" />
            </a>
        </div>
        <div class="col0_5lg col_lg_offSet_11 col_md_offSet_11 col_sm_offSet_11 col_xs_offSet_11 navIcon">
            <a href="#">
                <img class="menuImg" src="img/menu.png" alt="" />
            </a>
        </div>
    </div>


    <div class="row push">
        <div class="col4lg col4md col5sm col8xs header">
            <img class="img-responsive" src="img/headerH1.png" alt=""/>
        </div>
    </div>


    <div id="content" class="row push">
    </div>


    <div class="row rowLoadMore push">
        <div class="col0_5lg col0_5md col0_5sm col2xs loadMore"><label>LOAD MORE</label></div>
    </div>


</div>


<div class="row">
    <div class="modal">
        <div class="row">
            <div class="col4lg col4md col5sm col8xs header">
                <img class="img-responsive" src="img/headerH1.png" alt=""/>
            </div>
        </div>
        <div class="row">
            <div class="col0_5lg col_lg_offSet_7 col_md_offSet_8 col_sm_offSet_11 col_xs_offSet_12 navIcon">
                <a id="right-menu" href="#">
                    <img class="closePop_up" src="img/X.png" alt="" />
                </a>
            </div>
        </div>


            <iframe class="playerVideo" src="" frameborder="0";>
            </iframe>

    </div>
</div>



<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>

<script src="js/getStreams.js"></script>

</body>
</html>