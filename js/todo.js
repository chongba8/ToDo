$(function(){
    /*自定义storage存取方法*/
    var util = (function(){
        var head='HC-';
        var storageGetter = function (key) {
            return localStorage.getItem(head+key);
        }
        var storageSetter = function (key,val) {
            return localStorage.setItem(head+key,val);
        }
        return{
            storageGetter:storageGetter,
            storageSetter:storageSetter,
        }
    })();
    /*刷新初始化*/
    var dele,detail;
    var task_content = [];
    var task_desc = [];
    init();
    /*在输入框输入文字*/
    $('.task').change(function(){
        addTask($('.task').val());
        render($('.task').val());
        $('.task').val('');
    })


    /*点击删除按钮*/

    /*把输入的文字渲染到task-list*/
    function render(text){
        var str="<li class='task-item'>";
        str+="<span class='task-content'>"+text+" </span>";
        str+=" <span class='delete'>删除</span>";
        str+=" <span class='detail'>详细</span>";
        str+="</li>";
        $('.task-list').append(str);


    }
    /*/把输入的文字渲染到task-list*/
    /*保存输入文字到localstorage*/

    function addTask(content){
        task_content.push(content);
        util.storageSetter('content',task_content);
        console.log(task_content);
    }
    function deleTask(){
       $('.task-list').delegate('.delete','click',function(){
           var index=$('.delete').index($(this));
           task_content.splice(index,1);
           task_desc.splice(index,1);
           console.log(task_content);
           util.storageSetter('content',task_content);
           util.storageSetter('desc',task_desc);
           $(this).parent().remove();
       })
    }
    deleTask();
    /*点击显示详情*/
    var index1;
    function showDeatail() {
        $('.task-list').delegate('.detail', 'click', function () {
             index1 = $('.detail').index($(this));
            if(!util.storageGetter('desc')){task_desc=[]}
            else{  task_desc=util.storageGetter('desc').split(',');}
            if(!task_desc[index1]){$('.desc').text('');}
            else{$('.desc').text(task_desc[index1]);}
            $('.content').text(task_content[index1]);
            //console.log(index1);
            $('.mask').show();
            $('.mask').click(function () {
                $('.mask').hide();
                //console.log(1);

            })
            $('.task-detail').click(function (e) {
                e.stopPropagation();
            })


        })
        }
    showDeatail();
    $('.handin').on('click',function(){
        task_desc[index1]=$('.desc').text();
            //splice(index1,0,$('.desc').text());
        console.log(task_desc);

        util.storageSetter('desc',task_desc);
        $('.mask').hide();
    })

    function init(){
        $('.task-list').html('');
        if(!util.storageGetter('content')) return;

            task_content= util.storageGetter('content').split(',');
            for(var i= 0,length=task_content.length;i<length;i++){
                render(task_content[i]);
        }
    }

    /*/保存输入文字到localstorage*/

});
