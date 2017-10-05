from django.shortcuts import render

def index(request):
    context = {}
    context['text'] = 'index'
    return render(request,'index.html',context)

def single(request):
    context = {}
    context['text'] = 'single'
    return render(request,'single.html',context)

def contact(request):
    context = {}
    context['text'] = 'contact'
    return render(request, 'contact.html', context)

def about(request):
    context = {}
    context['text'] = 'about'
    return render(request, 'about.html', context)