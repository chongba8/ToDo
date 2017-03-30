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
        dele=$('.delete');
        detail=$('.detail');
        deleTask();
        showDeatail()

    }
    /*/把输入的文字渲染到task-list*/
   /*保存输入文字到localstorage*/

    function addTask(content){
        task_content.push(content);
        util.storageSetter('content',task_content);
    }
    function deleTask(){
        dele.each(function(index,ele){
            $(this).unbind('click').click(function () {
                task_content.splice(index,1);
                console.log(task_content);
                util.storageSetter('content',task_content);
                $(this).parent().remove();
                dele=$('.delete');
                detail=$('.detail');
                //console.log(dele);
                deleTask();
                showDeatail();
            })
        })
    }
        detail=$('.detail');
       /*点击显示详情*/
    function showDeatail(){
        detail.each(function(index,ele){
            $(this).unbind('click').click(function(){
                console.log(index);
                $('.mask').show();
                $('.mask').click(function(){
                    $('.mask').hide();
                })
                $('.content').text(task_content[index]);
            })


            $('.task-detail').click(function(e){
                e.stopPropagation();
                taskDesc($('.desc').text(),index);
            })
            $('.handin').click(function(){
                taskDesc($('.desc').text(),index);

            })

        })
    }
/*任务详细描述编辑保存*/
    function taskDesc(desc,index){
        task_desc[index]=desc;
        util.storageSetter('desc',task_desc);
    }

    showDeatail();
    function init(){
        $('.task-list').html('');
        if(util.storageGetter('content')=='') return;
        else{
            task_content= util.storageGetter('content').split(',');
            for(var i= 0,length=task_content.length;i<length;i++){
                render(task_content[i]);
            }
        }

    }

   /*/保存输入文字到localstorage*/

});