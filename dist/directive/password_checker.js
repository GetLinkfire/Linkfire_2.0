"use strict";angular.module("linkfireWebappApp").directive("pwCheck",[function(){return{require:"ngModel",link:function(e,n,i,a){var t="#"+i.pwCheck;n.add(t).on("keyup",function(){e.$apply(function(){var e=n.val()===$(t).val();a.$setValidity("pwmatch",e)})})}}}]);